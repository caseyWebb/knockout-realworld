import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { currentUser } from 'src/models/user'

export default class AppHeaderViewModel extends ViewModelConstructorBuilder {
  public currentUser = currentUser
}