import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Router, Context } from '@profiscience/knockout-contrib-router'
import { IContext } from '@profiscience/knockout-contrib-router'
import { IRoutedComponentInstance } from '@profiscience/knockout-contrib-router-plugins'
import { currentUser } from 'src/models/user'
import AuthViewModel from '../viewModel'

export default class RegisterViewModel extends ViewModelConstructorBuilder {
  public username: KnockoutObservable<string>
  public email: KnockoutObservable<string>
  public password: KnockoutObservable<string>
  public passwordConfirmation = ko.observable('')
  public errors = ko.observable()

  constructor(ctx: Context & IContext) {
    super()
    const parent: AuthViewModel = (ctx.$parent.component as IRoutedComponentInstance).viewModel
    this.username = parent.username
    this.email = parent.email
    this.password = parent.password
  }

  public async register() {
    try {
      await currentUser.register({
        username: this.username(),
        email: this.email(),
        password: this.password()
      })
      Router.update('//')
    } catch (e) {
      const { errors } = await e.response.json()
      this.errors(errors)
    }
  }
}