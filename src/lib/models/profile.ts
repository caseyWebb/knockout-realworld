import * as ko from 'knockout'
import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { INITIALIZED } from '@profiscience/knockout-contrib-router-plugins'
import { APIMixin, SpreadMixin } from 'lib/models.mixins'
import { currentUser } from './user'

type ProfileParams = {
  username: string
}

export class ProfileModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('profiles/:username'))  
  .Mixin(SpreadMixin('profile'))
  <ProfileParams> {
  
  public username!: string
  public following = ko.observable(false)

  public paths = {
    profile: `//profile/${this.params.username}`,
    favorites: `//profile/${this.params.username}/favorites`
  }
  
  public isCurrentUser = ko.pureComputed(() => currentUser.loggedIn() && currentUser.username() === this.username)

  public async toggleFollowing() {
    const opts = { params: { username: this.params.username } }
    const method = this.following() ? 'delete' : 'post'
    await this.api[method]('follow', opts)
    this.following.toggle()
  }
}