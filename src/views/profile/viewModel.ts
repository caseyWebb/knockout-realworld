import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Context } from '@profiscience/knockout-contrib-router'
import { ProfileModel } from 'lib/models/profile'

export default class ProfileViewModel extends ViewModelConstructorBuilder {
  public profile = new ProfileModel({ username: this.ctx.params.username })
  constructor(public ctx: Context) {
    super()
  }
}