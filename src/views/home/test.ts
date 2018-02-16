
import 'jest-jquery-matchers'
// @ts-ignore
import { createFixture } from '@profiscience/knockout-contrib-framework/support/jest'

import home from './index'

describe('home', () => {
  
  // test('sets the document title', async () => {
  //   const fixture = await createFixture(home)

  //   expect(fixture.title).toBe('Conduit')
  // })

  test('renders list of tags', async () => {
    // - registers framework/app runtime (plugins/middleware/bindings/components/...)
    // - creates wildcard route so route doesn't blow up
    // - creates dom container and initializes knockout
    // - initializes route
    const fixture = await createFixture(home)

    // mocked in src/models/__mocks__
    expect(fixture.dom).toHaveDescendantWithText('.tag-list .tag-pill', 'tag-1')
  })
})