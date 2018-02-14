import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin } from 'lib/models.mixins'

export class TagsModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('tags'))
  <{}> {
  public tags!: string[]
}