import * as ko from 'knockout'
import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import Query from '@profiscience/knockout-contrib-querystring'
import { ArticlesModel, TagsModel, currentUser } from 'lib/models'

export default class extends ViewModelConstructorBuilder {
  public currentUser = currentUser
  
  public articlesQuery = new Query({ feed: false, tag: undefined })
  public articles = new ArticlesModel(this.articlesQuery.asObservable())
  public tags = new TagsModel({})

  public isGlobalFeed = ko.pureComputed(() => this.articlesQuery.feed.isDefault() && this.articlesQuery.tag.isDefault())
  public showGlobalFeed() {
    this.articlesQuery.clear()
  }

  public isUserFeed = this.articlesQuery.feed
  public showUserFeed() {
    if (!this.currentUser.loggedIn()) return
    this.articlesQuery.clear()
    this.articlesQuery.feed(true)
  }

  public showTag(tag: string) {
    this.articlesQuery.clear()
    this.articlesQuery.tag(tag)
  }
}