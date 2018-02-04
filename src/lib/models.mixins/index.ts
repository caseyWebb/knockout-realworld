import { createRESTMixin } from '@profiscience/knockout-contrib-model'
import { currentUser } from 'lib/models'

export {
  TransformMixin
} from '@profiscience/knockout-contrib-model'

export const APIMixin = createRESTMixin({
  baseURL: 'https://conduit.productionready.io/api',
  cors: true,
  headers: {
    Authorization: ko.pureComputed(() => `Token ${currentUser.token()}`)
  }
})