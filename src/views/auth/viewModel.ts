import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'

export default class LoginViewModel extends ViewModelConstructorBuilder {
  public username = ko.observable('')
  public email = ko.observable('')
  public password = ko.observable('')
}