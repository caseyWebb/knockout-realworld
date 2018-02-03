import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { ArticlesModel, TagsModel, currentUser } from 'lib/models'

enum Tab {
  Global = 'global',
  Tag = 'tag',
  User = 'user'
}

export default class extends ViewModelConstructorBuilder {
  public tab: KnockoutObservable<Tab> = ko.observable(Tab.Global)
  public currentUser = currentUser
  public articles = new ArticlesModel({ feed: ko.pureComputed(() => this.tab() === Tab.User) })
  public tags = new TagsModel({})
}