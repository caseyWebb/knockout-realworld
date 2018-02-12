import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { currentUser, UserModel } from 'lib/models/user'
import { APIMixin, LazyMixin, TransformMixin } from 'lib/models.mixins'

export type CommentsParams = {
  articleSlug: string
}

export type CommentParams = {
  articleSlug: string
  id: number
}

export class CommentModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:articleSlug/comments/:id'))
  <CommentParams> {
  public id!: KnockoutObservable<number>
  public author!: UserModel
  public isOwn = ko.pureComputed(() => currentUser.username() === this.author.username())
}

export class CommentsModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:articleSlug/comments'))
  .Mixin(TransformMixin<CommentsParams>((data: any, params) => ({
    ...data,
    comments: data.comments.map((c: any) => new CommentModel({
      articleSlug: params.articleSlug,
      id: c.id
    }, c))
  })))
  // will not initialize until instance.comments is accessed.
  // this allows adding as property of ArticleModel while still
  // casting articles in the ArticlesModel, without fetching comments
  // for every listed article
  .Mixin(LazyMixin('comments'))
  <CommentsParams> {
  
  public comments = ko.observableArray([])

  public async postComment({ body }: { body: string }) {
    const c = new CommentsModel(this.params, { body })
    await c.create()
  }
}