import { createRESTMixin } from '@profiscience/knockout-contrib-model'

export const APIMixin = createRESTMixin({
  baseURL: 'https://conduit.productionready.io/api',
  cors: true,
  authenticated: true
})