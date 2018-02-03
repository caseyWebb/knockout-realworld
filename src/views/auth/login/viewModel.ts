import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { IContext, Context, Router } from '@profiscience/knockout-contrib-router'
import { IRoutedComponentInstance } from '@profiscience/knockout-contrib-router-plugins'
import { UserModel } from 'lib/models'
import AuthViewModel from '../viewModel'

export default class LoginViewModel extends ViewModelConstructorBuilder {
  public email: KnockoutObservable<string>
  public password: KnockoutObservable<string>
  public errors = ko.observableArray()

  constructor(ctx: Context & IContext) {
    super()
    const parent: AuthViewModel = (ctx.$parent.component as IRoutedComponentInstance).viewModel
    this.email = parent.email
    this.password = parent.password
  }

  public async login() {
    try {
      await UserModel.login({
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