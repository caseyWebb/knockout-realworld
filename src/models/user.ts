import * as ko from 'knockout'
import { DataModelConstructorBuilder, createRESTMixin, nonenumerable } from '@profiscience/knockout-contrib-model'
import { INITIALIZED } from '@profiscience/knockout-contrib-router-plugins'

type Credentials = {
  email: string
  password: string
}

// can't import APIMixin from src/model.mixins b/c that would create a circular dependency
const headers = ko.observable()
const APIMixin = createRESTMixin({
  baseURL: 'https://conduit.productionready.io',
  cors: true,
  headers
})

export class CurrentUserModel extends DataModelConstructorBuilder
  .Mixin(APIMixin('api')) // user/users inconsistency, need to make param optional but for now prevents double //
  <{}> { 

  public token!: string
  public email = ko.observable('')
  public username = ko.observable('')

  public loggedIn = ko.observable(false)

  constructor() {
    super({})

    nonenumerable(this, 'loggedIn')

    // could potentially be out of sync, e.g. edited on a different device/browser
    this.sync()
  }

  get localStorage() {
    const json = localStorage.getItem('CURRENT_USER')
    return json
      ? JSON.parse(json)
      : null
  }
  set localStorage(u) {
    if (u) {
      localStorage.setItem('CURRENT_USER', JSON.stringify(u))
    } else {
      localStorage.removeItem('CURRENT_USER')
    }
  }

  protected async fetch() {
    return this.localStorage
      ? {
        ...this.localStorage,
        loggedIn: true
      }
      : {
        loggedIn: false,
        token: undefined,
        email: undefined,
        username: undefined
      }
  }

  public async save({ password }: { password?: string } = {}) {
    const { user: updatedUser } = await this.api.put('user', {
      data: {
        ...this.toJS(),
        password
      }
    })
    this.localStorage = updatedUser
    await this.update()
  }

  public async register(user: Credentials & { username: string }) {
    const res = await this.api.post('users', { data: { user } })
    this.localStorage = res.user
    await this.update()
  }

  public async login(credentials: Credentials) {
    const { user } = await this.api.post('users/login', { data: { user: credentials } })
    this.localStorage = user
    await this.update()
  }

  public async logout() {
    this.localStorage = undefined
    await this.update()
  }

  private async sync() {
    await this[INITIALIZED]

    if (this.loggedIn()) {
      headers({ Authorization: `Token ${this.token}` })
      this.api.get('user')
        .then(({ user }) => {
          this.localStorage = user
          this.update()
        })
        .catch((err) => {
          // tslint:disable-next-line
          console.error('Failed to fetch updated current user', err)
        })
    }
  }
}

export const currentUser = new CurrentUserModel()