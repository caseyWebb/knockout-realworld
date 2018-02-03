import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import Query from '@profiscience/knockout-contrib-querystring'
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
  tag?: KnockoutObservable<string | void> | KnockoutComputed<string | void>
  favorited?: string
}

export class ArticleModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:slug'))
  <ArticleParams> {
  
  public path = `//article/${this.params.slug}`
}

export class ArticlesModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/feed?'))
  .Mixin(TransformMixin((data) => ({
    ...data,
    articles: data.articles.map((a: any) => {
      const m = new ArticleModel({ slug: a.slug }, a)
      // the articles in the list will never need to refresh,
      // so dispose the update subscription immediately.
      // this also prevents a bunch of ajax calls on logout
      m.dispose()
      return m 
    })
  })))
  <ArticlesParams | KnockoutObservable<any>> {
  
  public articles: KnockoutObservableArray<ArticleModel> = ko.observableArray()
}