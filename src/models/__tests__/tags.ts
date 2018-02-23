import 'jest-fetch-mock'; (global as any).fetch = require('jest-fetch-mock')

import { TagsModel } from '../tags'

describe('TagsModel', () => {
  test('initializes with the correct endpoint', async () => {
    const { mock } = fetch.mockResponseOnce('{}') as any

    await TagsModel.create({})
    
    expect(mock.calls[0][0]).toBe('https://conduit.productionready.io/api/tags')
  })

  test('has tags property with correct data', async () => {
    const tags = [
      'reactjs',
      'angularjs'
    ]
    const { mock } = fetch.mockResponseOnce(JSON.stringify({ tags })) as any
    
    const model = await TagsModel.create({})
    
    expect(model.tags).toEqual(tags)
  })
})