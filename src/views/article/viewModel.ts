// import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Context } from '@profiscience/knockout-contrib-router'
import { ArticleModel, ArticleParams } from 'lib/models/article'
import { CommentsModel } from 'lib/models/comment'
import { currentUser } from 'lib/models/user'

export default class extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  public article = new ArticleModel({ slug: this.ctx.params.slug })
  public comments = new CommentsModel({ articleSlug: this.ctx.params.slug })
  constructor(protected ctx: Context) {
    super()
  }
}