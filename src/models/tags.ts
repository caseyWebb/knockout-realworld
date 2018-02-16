import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin } from 'src/models.mixins'

export class TagsModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('tags'))
  <{}> {
  public tags!: string[]
}