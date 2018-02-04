import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Router } from '@profiscience/knockout-contrib-router'
import { currentUser } from 'lib/models'

export default class SettingsViewModel extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  public password = ko.observable('')

  async save() {
    await currentUser.save({ password: this.password() })
    Router.update('//')
  }
}