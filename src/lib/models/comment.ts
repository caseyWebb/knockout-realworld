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
  .Mixin(TransformMixin(castAuthor))
  <CommentParams> {

  public id!: KnockoutObservable<number>
  public author!: ProfileModel
}

export class CommentsModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:articleSlug/comments'))
  .Mixin(TransformMixin<CommentsParams>(castComments))
  // will not initialize until instance.comments is accessed.
  // this allows adding as property of ArticleModel while still
  // casting articles in the ArticlesModel, without fetching comments
  // for every listed article
  .Mixin(LazyMixin('comments'))
  <CommentsParams> {
  
  public comments = ko.observableArray([])

  public async postComment({ body }: { body: string }) {
    const c = await CommentModel.create(this.params, { body, author: currentUser.toJS() })
    await c.create()
  }
}

async function castAuthor(data: any) {
  const author = await ProfileModel.create({ username: data.author.username }, { profile: data.author })
  return {
    ...data,
    author
  }
}

async function castComments(data: any, params: CommentsParams) {
  const comments = await Promise.all(
    data.comments.map((c: any) => CommentModel.create({
      articleSlug: params.articleSlug,
      id: c.id
    }, c))
  )
  return {
    ...data,
    comments
  }
}