import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Context } from '@profiscience/knockout-contrib-router'
import { ArticlesModel } from 'lib/models/article'

export default class ProfileArticlesViewModel extends ViewModelConstructorBuilder {
  public articles = new ArticlesModel({ author: this.ctx.$parent.params.username })
  constructor(public ctx: Context) {
    super()
  }
}