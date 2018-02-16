// import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Context } from '@profiscience/knockout-contrib-router'
import { ArticleModel, ArticleParams } from 'src/models/article'
import { CommentsModel } from 'src/models/comment'
import { currentUser } from 'src/models/user'

export default class extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  public article = new ArticleModel({ slug: this.ctx.params.slug })
  public comments = new CommentsModel({ articleSlug: this.ctx.params.slug })
  constructor(protected ctx: Context) {
    super()
  }
}