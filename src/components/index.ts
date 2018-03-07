/**
 * As your app grows, you may want to consider auto-generating this file
 */

import * as ko from 'knockout'

/**
 * Register all knockout-contrib components lazily, will only be fetched if used
 */
import '@profiscience/knockout-contrib-components/lazy'

/**
 * Register app components synchronously so they are included in the entry bundle
 * and available immediately for rendering
 */
import * as footer from './app-footer'
import * as header from './app-header'
ko.components.register('app-footer', footer)
ko.components.register('app-header', header)

/**
 * Use the same loader for our own non-app components
 */
import { LazyComponentLoader } from '@profiscience/knockout-contrib-components/loader'

ko.components.loaders.unshift(
  new LazyComponentLoader({
    'article-form': () => import('./article-form'),
    'article-list': () => import('./article-list'),
    'article-meta': () => import('./article-meta'),
    'comment-form': () => import('./comment-form'),
    'comment-list': () => import('./comment-list'),
    'login-form-errors': () => import('./login-form-errors'),
    'tag-list': () => import('./tag-list')
  })
)