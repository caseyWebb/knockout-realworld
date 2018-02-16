import '@profiscience/knockout-contrib-filters/date.format'
import { ArticlesModel } from 'src/models/article'

type ArticleListParams = {
  articles: ArticlesModel
}

export default class ArticleListViewModel {
  public articles: ArticlesModel
  constructor(params: ArticleListParams) {
    this.articles = params.articles
  }
}