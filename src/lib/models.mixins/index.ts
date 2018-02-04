import { createRESTMixin } from '@profiscience/knockout-contrib-model'
import { currentUser } from 'lib/models'

export {
  LazyMixin,
  PagerMixin,
  TransformMixin
} from '@profiscience/knockout-contrib-model'

export const APIMixin = createRESTMixin({
  baseURL: 'https://conduit.productionready.io/api',
  cors: true,
  headers: ko.pureComputed(() => {
    if (currentUser.loggedIn()) {
      return { Authorization: `Token ${currentUser.token()}` }
    } else {
      return {}
    }
  })
})