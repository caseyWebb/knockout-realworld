import * as ko from 'knockout'
import { createRESTMixin } from '@profiscience/knockout-contrib-model'
import { currentUser } from 'lib/models/user'

export {
  PagerMixin,
  SpreadMixin,
  TransformMixin
} from '@profiscience/knockout-contrib-model'

export const APIMixin = createRESTMixin({
  baseURL: 'https://conduit.productionready.io/api',
  cors: true,
  headers: ko.pureComputed(() => currentUser.loggedIn()
    ? { Authorization: `Token ${currentUser.token}` }
    : {}
  )
})