import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin, TransformMixin } from 'lib/models.mixins'

const PAGE_SIZE = 20

export type ArticleParams = {
  /**
   * URL interpolation param(s)
   */
  slug: string
}

export type ArticlesParams = {
  /**
   * URL interpolation param(s)
   */
  feed: KnockoutObservable<boolean> | KnockoutComputed<boolean>

  /**
   * Querystring param(s)
   */
  // limit: number
  // offset: number
  tag?: string
  favorited?: string
}

export class ArticleModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:slug'))
  <ArticleParams> {
}

export class ArticlesModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/feed?'))
  .Mixin(TransformMixin((data) => ({
    ...data,
    articles: data.articles.map((a: any) => new ArticleModel({ slug: a.slug }, a))
  })))
  <ArticlesParams> {
}