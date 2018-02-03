import * as ko from 'knockout'
import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin } from 'lib/models.mixins'

type Credentials = {
  email: string
  password: string
}

export class UserModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('user'))
  <{}> {

  constructor() {
    super({}, JSON.parse(localStorage.getItem('CURRENT_USER') || '{}'))
  }
  
  public loggedIn = ko.observable(localStorage.getItem('CURRENT_USER') !== null)
  
  // public async login(credentials: Credentials) {
  //   const u = await this.api.post('login', { data: credentials })
  //   localStorage.setItem('CURRENT_USER', JSON.stringify(u))
  // }

  // public async logout() {
  //   localStorage.removeItem('CURRENT_USER')
  // }
}

export const currentUser = new UserModel()