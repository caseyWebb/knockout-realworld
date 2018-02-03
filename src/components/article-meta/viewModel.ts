import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { ArticleModel } from 'lib/models'

export default class ArticleMetaComponent extends ViewModelConstructorBuilder {
  public article: ArticleModel

  constructor({ article }: { article: ArticleModel }) {
    super()
    this.article = article
  }
}