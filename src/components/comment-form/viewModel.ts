import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { CommentsModel } from 'lib/models/comment'
import { currentUser } from 'lib/models/user'

export type CommentFormParams = {
  comments: CommentsModel
}

export default class CommentFormViewModel extends ViewModelConstructorBuilder {
  private comments: CommentsModel
  public currentUser = currentUser
  public body = ko.observable('')

  constructor(params: CommentFormParams) {
    super()
    this.comments = params.comments
  }

  public async post() {
    await this.comments.postComment({ body: this.body() })
    this.body('')
  }
}