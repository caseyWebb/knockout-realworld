import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { currentUser } from 'lib/models'

export default class AppHeaderViewModel extends ViewModelConstructorBuilder {
  public currentUser = currentUser
}