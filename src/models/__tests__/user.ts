import * as fetch from 'jest-fetch-mock'
import '@profiscience/knockout-contrib-observable-fn/subscribeOnce'
import { INITIALIZED } from '@profiscience/knockout-contrib-router-plugins'

import { CurrentUserModel, currentUser } from '../user'

(global as any).fetch = fetch

currentUser.dispose()

describe('CurrentUserModel', () => {
  beforeEach(() => {
    localStorage.clear()
    fetch.resetMocks()
  })

  test('not logged in by default', async () => {
    const currentUser = await CurrentUserModel.create({})

    expect(currentUser.loggedIn()).toBe(false)

    currentUser.dispose()
  })

  test('initializes from CURRENT_USER localStorage value', async () => {
    localStorage.setItem('CURRENT_USER', JSON.stringify({ token: 'FOO' }))

    fetch.mockResponseOnce('{}')

    const currentUser = await CurrentUserModel.create({})

    expect(currentUser.loggedIn()).toBe(true)
    expect(currentUser.token).toBe('FOO')

    currentUser.dispose()
  })

  test('syncs from the server if logged in', (done) => {
    localStorage.setItem('CURRENT_USER', JSON.stringify({ username: 'FOO', token: 'TOKEN' }))

    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user: { username: 'BAR' } })) as any

    CurrentUserModel.create({})
      .then((currentUser) => {
        expect(mock.calls[0][1].headers.Authorization).toBe('Token TOKEN')
        currentUser.username.subscribeOnce((v) => {
          expect(v).toBe('BAR')
          currentUser.dispose()
          done()
        })
      })
  })

  test('syncs from the server if logged in', (done) => {
    localStorage.setItem('CURRENT_USER', JSON.stringify({ username: 'FOO' }))

    fetch.mockResponseOnce(JSON.stringify({ user: { username: 'BAR' } }))

    CurrentUserModel.create({})
      .then((currentUser) => {
        currentUser.username.subscribeOnce((v) => {
          expect(v).toBe('BAR')
          currentUser.dispose()
          done()
        })
      })
  })

  test('.login() makes the correct API call', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const { mock } = fetch.mockResponseOnce('{}') as any
    await currentUser.login(credentials)
    expect(mock.calls[0][0]).toBe('https://conduit.productionready.io/api/users/login')
    expect(mock.calls[0][1].method).toBe('POST')
    expect(mock.calls[0][1].body).toEqual(JSON.stringify({ user: credentials }))
  })

  test('.login() populates the user\'s data', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      token: 'TOKEN',
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.login(credentials)
    expect(currentUser.toJS()).toEqual(user)
    expect(currentUser.loggedIn()).toBe(true)
  })

  test('.login() stores the user in localStorage', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      token: 'TOKEN',
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.login(credentials)
    expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
  })

  test('.register() makes the correct API call', async () => {
    const currentUser = await CurrentUserModel.create({})
    const user = {
      email: 'foo@example.com',
      password: 'foobar',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce('{}') as any
    await currentUser.register(user)
    expect(mock.calls[0][0]).toBe('https://conduit.productionready.io/api/users')
    expect(mock.calls[0][1].method).toBe('POST')
    expect(mock.calls[0][1].body).toEqual(JSON.stringify({ user }))
  })

  test('.register() populates the user\'s data', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.register({ ...credentials, ...user })
    expect(currentUser.toJS()).toEqual(user)
    expect(currentUser.loggedIn()).toBe(true)
  })

  test('.register() stores the user in localStorage', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.register({ ...credentials, ...user })
    expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
  })

  test('.logout() clears localStorage', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      token: 'TOKEN',
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.login(credentials)
    expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
    await currentUser.logout()
    expect(localStorage.__STORE__.CURRENT_USER).toBeUndefined()
  })

  test('.logout() toggles sets loggedIn false', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      token: 'TOKEN',
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.login(credentials)
    expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
    await currentUser.logout()
    expect(currentUser.loggedIn()).toBe(false)
  })

  test('.logout() clears the current user\'s data', async () => {
    const currentUser = await CurrentUserModel.create({})
    const credentials = {
      email: 'foo@example.com',
      password: 'foobar'
    }
    const user = {
      token: 'TOKEN',
      email: 'foo@example.com',
      username: 'foo'
    }
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
    await currentUser.login(credentials)
    expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
    await currentUser.logout()
    expect(currentUser.toJS()).toEqual({ token: undefined, email: undefined, username: undefined })
  })

  test('.save() makes the correct API call', async () => {
    const currentUser = await CurrentUserModel.create({})

    { // setup
      const user = { username: 'foo', email: 'foo@example.com' }
      const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
      await currentUser.register({ ...user, password: 'foobar' })
      fetch.resetMocks()
    }

    { // test
      const user = { username: 'bar', email: 'bar@example.com' }
      const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
      currentUser.username('bar')
      currentUser.email('bar@example.com')
      await currentUser.save()
      expect(mock.calls[0][0]).toBe('https://conduit.productionready.io/api/user')
      expect(mock.calls[0][1].method).toBe('PUT')
      expect(JSON.parse(mock.calls[0][1].body)).toEqual(user)
    }
  })

  test('.save() persists the user to localStorage', async () => {
    const currentUser = await CurrentUserModel.create({})

    { // setup
      const user = { username: 'foo', email: 'foo@example.com' }
      const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
      await currentUser.register({ ...user, password: 'foobar' })
      fetch.resetMocks()
    }

    { // test
      const user = { username: 'bar', email: 'bar@example.com', token: 'TOKEN' }
      const { mock } = fetch.mockResponseOnce(JSON.stringify({ user })) as any
      currentUser.username('bar')
      currentUser.email('bar@example.com')
      await currentUser.save()
      expect(localStorage.__STORE__.CURRENT_USER).toEqual(JSON.stringify(user))
    }
  })
})