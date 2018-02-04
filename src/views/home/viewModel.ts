import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { ArticlesModel, TagsModel, currentUser } from 'lib/models'

export default class extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  
  private query = {
    feed: ko.observable(currentUser.loggedIn()),
    tag: ko.observable('')
  }
  public articles = new ArticlesModel(this.query)
  public tags = new TagsModel({})

  public isGlobalFeed = ko.pureComputed(() => !this.query.feed() && !this.query.tag())
  public showGlobalFeed() {
    this.query.feed(false)
    this.query.tag('')
  }

  public isUserFeed = this.query.feed
  public showUserFeed() {
    if (!this.currentUser.loggedIn()) return
    this.query.feed(true)
    this.query.tag('')
  }

  public showTag(tag: string) {
    this.query.feed(false)
    this.query.tag(tag)
  }
}