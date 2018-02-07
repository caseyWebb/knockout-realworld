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
  .Mixin(TransformMixin(function mapComments(this: CommentsModel, data: any) {
    return {
      ...data,
      comments: data.comments.map((c: any) => {
        const m = new CommentModel({
          articleSlug: this.params.articleSlug,
          id: c.id
        }, c)
        m.dispose()
        return m
      })
    }
  }))
  .Mixin(LazyMixin('comments'))
  <CommentsParams> {
  
  public comments = ko.observableArray([])

  public async postComment({ body }: { body: string }) {
    const c = new CommentsModel(this.params, { body })
    await c.create()
  }
}