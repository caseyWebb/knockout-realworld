import * as ko from 'knockout'
import { DataModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { APIMixin } from 'lib/models.mixins'

type Credentials = {
  email: string
  password: string
}

const CURRENT_USER = 'CURRENT_USER'

export class UserModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('')) // user/users inconsistency
  <{}> {
  
  public loggedIn = ko.observable(false)
  public username!: KnockoutObservable<string>
  public email!: KnockoutObservable<string>
  public token!: KnockoutObservable<string>
  public bio!: string
  public image?: string

  protected async fetch() {
    const fromLocalStorage = localStorage.getItem(CURRENT_USER)
    return fromLocalStorage
      ? {
          ...JSON.parse(fromLocalStorage),
          loggedIn: true
        }
      : {
          loggedIn: false
        }
  }

  public async save({ password }: { password?: string } = {}) {
    const { user: updatedUser } = await this.api.put('user', {
      data: {
        ...this.toJS(),
        password
      }
    })
    localStorage.setItem(CURRENT_USER, JSON.stringify(updatedUser))
    await currentUser.update()
  }

  public static async register(user: Credentials & { username: string }) {
    const u = new UserModel({})
    const res = await u.api.post('users', { data: { user } })
    localStorage.setItem(CURRENT_USER, JSON.stringify(res.user))
    u.dispose()
    await currentUser.update()
  }

  public static async login(credentials: Credentials) {
    const u = new UserModel({})
    const { user } = await u.api.post('users/login', { data: { user: credentials } })
    localStorage.setItem(CURRENT_USER, JSON.stringify(user))
    u.dispose()
    await currentUser.update()
  }

  public async logout() {
    localStorage.removeItem(CURRENT_USER)
    await currentUser.update()
  }
}

export const currentUser = new UserModel({})