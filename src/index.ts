import * as ko from 'knockout'
import { Router } from '@profiscience/knockout-contrib-router'
import 'knockout-punches'

import 'src/components'
import 'src/routing'
import 'src/views'

(window as any).ko = ko

ko.options.deferUpdates = true
ko.punches.enableAll()
ko.applyBindings({ isNavigating: Router.isNavigating })