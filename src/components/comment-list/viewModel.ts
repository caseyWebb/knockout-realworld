import '@profiscience/knockout-contrib-filters/date.format'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { CommentsModel } from 'src/models/comment'

export type CommentListParams = {
  comments: CommentsModel
}

export default class CommentListViewModel extends ViewModelConstructorBuilder {
  public comments: CommentsModel
  constructor(params: CommentListParams) {
    super()
    this.comments = params.comments
  }
}