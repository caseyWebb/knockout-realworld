import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import Query from '@profiscience/knockout-contrib-querystring'
import { ArticlesModel } from 'lib/models/article'
import { TagsModel } from 'lib/models/tags'
import { currentUser } from 'lib/models/user'

export default class extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  
  private query = new Query({
    feed: currentUser.loggedIn() ? 'user' : 'global',
    tag: ''
  })
  public articles = new ArticlesModel(ko.pureComputed(() => ({
    feed: this.query.feed() === 'user',
    tag: this.query.tag()
  })))
  public tags = new TagsModel({})

  public showTabs = ko.pureComputed(() => currentUser.loggedIn() || this.query.feed() === 'tag')

  public isGlobalFeed = ko.pureComputed(() => this.query.feed() === 'global')
  public showGlobalFeed() {
    this.query.clear()
    this.query.feed('global')
  }

  public isUserFeed = ko.pureComputed(() => this.query.feed() === 'user')
  public showUserFeed() {
    if (!this.currentUser.loggedIn()) return
    this.query.clear()
    this.query.feed('user')
  }

  public showTag(tag: string) {
    this.query.feed('tag')
    this.query.tag(tag)
  }
}