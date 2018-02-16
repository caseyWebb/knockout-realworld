import '@profiscience/knockout-contrib-observable-fn/increment'
import '@profiscience/knockout-contrib-observable-fn/toggle'
import { DataModelConstructorBuilder, PagerMixin } from '@profiscience/knockout-contrib-model'
import { APIMixin, SpreadMixin, TransformMixin } from 'src/models.mixins'
import { ProfileModel } from 'src/models/profile'
import { currentUser } from 'src/models/user'

const PAGE_SIZE = 10

export type ArticleParams = {
  slug?: string // nullable for creating new article
}

export type ArticlesParams = {
  feed?: KnockoutObservable<boolean> | KnockoutComputed<boolean>
  author?: KnockoutObservable<string>
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
  
  public slug!: string
  public favorited = ko.observable(false)
  public favoritesCount = ko.observable(0)
  
  public paths = {
    show: `//article/${this.params.slug}`,
    edit: `//editor/${this.params.slug}`
  }
  
  public async toggleFavorite() {
    const opts = { params: { slug: this.params.slug } }
    const method = this.favorited() ? 'delete' : 'post'
    await this.api[method]('favorite', opts)
    this.favorited.toggle()
    if (this.favorited()) {
      this.favoritesCount.increment()
    } else {
      this.favoritesCount.decrement()
    }
  }
}

export class EditableArticleModel extends ArticleModel {
  public title = ko.observable('')
  public description = ko.observable('')
  public body = ko.observable('')
  public tagList = ko.observableArray()
}

export class NewArticleModel extends EditableArticleModel {
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