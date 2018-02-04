import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin, LazyMixin } from 'lib/models.mixins'

export type CommentsParams = {
  articleSlug: string
}

export class CommentsModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('articles/:articleSlug/comments'))
  .Mixin(LazyMixin('comments'))
  <CommentsParams> {
  
  public comments = ko.observableArray([])
}