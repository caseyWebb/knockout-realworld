/**
 * This file only sets up routing, it does not actually register the routes;
 * that happens in views/index.ts. This is by design, because plugin regstration
 * *must* occur before routes are instantiated.
 */

import { Route, Router } from '@profiscience/knockout-contrib-router'
import {
  flashMessageMiddleware
} from '@profiscience/knockout-contrib-router-middleware'
import {
  childrenPlugin,
  componentPlugin,
  initializerPlugin,
  redirectPlugin
} from '@profiscience/knockout-contrib-router-plugins'

Router
  .setConfig({
    /**
     * Hashbang or HTML5 routing
     */
    hashbang: true,
    /**
     * Class to apply to elements with path or activePath binding when
     * they match the current route
     */
    activePathCSSClass: 'active',
    /**
     * Base path to resolve url, if serving from a directory this will be
     * that directory
     */
    base: DEBUG
      ? ''                    // development
      : '/knockout-realworld' // gh-pages
  })
  .use(
    flashMessageMiddleware
  )

Route.usePlugin(
  /**
   * Each plugin (except the initializerPlugin, which works with the component
   * plugin) corresponds to an equivalently named property in the config passed
   * to the Route constructor.
   */
  redirectPlugin,
  componentPlugin,
  initializerPlugin,
  childrenPlugin
)