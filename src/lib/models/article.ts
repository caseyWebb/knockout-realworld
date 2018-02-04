import { DataModelConstructorBuilder, PagerMixin } from '@profiscience/knockout-contrib-model'
import { APIMixin, TransformMixin } from 'lib/models.mixins'
import { CommentsModel } from 'lib/models'

const PAGE_SIZE = 10

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
  tag?: KnockoutObservable<string | void> | KnockoutComputed<string | void>
  favorited?: string
}

export class ArticleModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:slug'))
  <ArticleParams> {
  
  public path = `//article/${this.params.slug}`

  // CommentsModel uses the LazyMixin so that it does not 
  public comments = new CommentsModel({ articleSlug: this.params.slug })
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
    articles: data.articles.map((a: any) => {
      const m = new ArticleModel({ slug: a.slug }, a)
      // the articles in the list will never need to refresh,
      // so dispose the update subscription immediately.
      // this also prevents a bunch of ajax calls on logout
      m.dispose()
      return m
    })
  }
}

function limitOffsetPaginationStrategy(page: number) {
  return {
    limit: PAGE_SIZE,
    offset: PAGE_SIZE * (page - 1)
  }
}