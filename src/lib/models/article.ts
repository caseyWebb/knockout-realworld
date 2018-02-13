import { DataModelConstructorBuilder, PagerMixin } from '@profiscience/knockout-contrib-model'
import { APIMixin, SpreadMixin, TransformMixin } from 'lib/models.mixins'
import { CommentsModel } from 'lib/models/comment'
import { ProfileModel, currentUser } from 'lib/models/user'

const PAGE_SIZE = 10

export type ArticleParams = {
  /**
   * URL interpolation param(s)
   */
  slug?: string // nullable for creating new article
}

export type ArticlesParams = {
  /**
   * URL interpolation param(s)
   */
  feed: KnockoutObservable<boolean> | KnockoutComputed<boolean>

  /**
   * Querystring param(s)
   */
  tag?: KnockoutObservable<string | void> | KnockoutComputed<string | void>
  favorited?: string
}

export class ArticleModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:slug?'))
  .Mixin(TransformMixin(castAuthor))
  // response is { "article": { ... } }, spread those props to prevent article.article duplication
  // NOTE: when creating with initData (second arg to constructor or #create()), you MUST provide data
  // in the same format as .fetch(), i.e. it needs to be wrapped like `new ArticleModel({}, { article: { ... } })`
  .Mixin(SpreadMixin('article'))
  <ArticleParams> {
  
  public paths = {
    show: `//article/${this.params.slug}`,
    edit: `//editor/${this.params.slug}`
  }

  // CommentsModel uses the LazyMixin so they are not fetched unless accessed.
  // This allows sharing this model with the list and editor.
  public comments = new CommentsModel({ articleSlug: this.params.slug as string })
}

export class NewArticleModel extends ArticleModel {
  constructor() {
    super({}, {
      article: {
        author: currentUser.toJS(),
        body: '',
        description: '',
        title: ''
      }
    })
  }
}

export class ArticlesModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/feed?'))
  .Mixin(TransformMixin(castArticles))
  .Mixin(PagerMixin('articles', limitOffsetPaginationStrategy))
  <ArticlesParams | KnockoutObservable<any>> {
  
  public articles: KnockoutObservableArray<ArticleModel> = ko.observableArray()
}

async function castArticles(data: any) {
  const articles = await Promise.all(
    data.articles.map((a: any) => ArticleModel.create({ slug: a.slug }, { article: a }))
  )
  return {
    ...data,
    articles
  }
}

async function castAuthor(data: any) {
  const author = await ProfileModel.create({ username: data.article.author.username }, { profile: data.article.author })
  return {
    // will be passed into SpreadMixin
    article: {
      ...data.article,
      author
    }
  }
}

function limitOffsetPaginationStrategy(page: number) {
  return {
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (page - 1)
  }
}