import { ArticlesModel } from 'lib/models/article'

type ArticleListParams = {
  articles: ArticlesModel
}

export default class ArticleListViewModel {
  public articles: ArticlesModel
  constructor(params: ArticleListParams) {
    this.articles = params.articles
  }
}