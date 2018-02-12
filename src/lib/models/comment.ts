import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { ProfileModel, currentUser } from 'lib/models/user'
import { APIMixin, LazyMixin, TransformMixin } from 'lib/models.mixins'

export type CommentsParams = {
  articleSlug: string
}

export type CommentParams = {
  articleSlug: string
  id?: number // nullable for new comments
}

export class CommentModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:articleSlug/comments/:id?'))
  .Mixin(TransformMixin((data) => ({
    ...data,
    author: new ProfileModel({ username: data.author.username }, { profile: data.author })
  })))
  <CommentParams> {

  public id!: KnockoutObservable<number>
  public author!: ProfileModel
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
    const c = new CommentModel(this.params, { body, author: currentUser.toJS() })
    await c.create()
  }
}