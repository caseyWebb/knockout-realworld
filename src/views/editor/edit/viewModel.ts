import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Context } from '@profiscience/knockout-contrib-router'
import { ArticleModel } from 'lib/models/article'

export default class ArticleEditViewModel extends ViewModelConstructorBuilder {
  public article = new ArticleModel({ slug: this.ctx.params.slug })
  constructor(protected ctx: Context) {
    super()
  }
}