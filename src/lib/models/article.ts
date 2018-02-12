import { DataModelConstructorBuilder, PagerMixin } from '@profiscience/knockout-contrib-model'
import { APIMixin, SpreadMixin, TransformMixin } from 'lib/models.mixins'
import { CommentsModel } from 'lib/models/comment'

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
  // response is { "article": { ... } }, spread those props to prevent article.article duplication
  .Mixin(SpreadMixin('article'))
  <ArticleParams> {
  
  public path = `//article/${this.params.slug}`

  // CommentsModel uses the LazyMixin so they are not fetched unless accessed.
  // This allows sharing this model with the list and editor.
  public comments = new CommentsModel({ articleSlug: this.params.slug as string })
}

export class ArticlesModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/feed?'))
  .Mixin(TransformMixin(mapArticles))
  .Mixin(PagerMixin('articles', limitOffsetPaginationStrategy))
  <ArticlesParams | KnockoutObservable<any>> {
  
  public articles: KnockoutObservableArray<ArticleModel> = ko.observableArray()
}

function mapArticles(data: any) {
  return {
    ...data,
    articles: data.articles.map((a: any) => new ArticleModel({ slug: a.slug }, { article: a }))
  }
}

function limitOffsetPaginationStrategy(page: number) {
  return {
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (page - 1)
  }
}