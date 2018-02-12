import * as ko from 'knockout'
import { Router } from '@profiscience/knockout-contrib-router'
import { merge } from '@profiscience/knockout-contrib-utils'
import { ArticleModel } from 'lib/models/article'
import { FLASH_MESSAGE } from '@profiscience/knockout-contrib-router-middleware'

export type ArticleFormParams = {
  article?: ArticleModel
}

export default class ArticleFormViewModel {
  public article?: ArticleModel

  constructor(params: ArticleFormParams) {
    this.article = params.article
  }

  public title = ko.observable('')
  public description = ko.observable('')
  public body = ko.observable('')
  public tags = ko.observableArray([])

  public async save() {
    const article = ko.toJS({
      title: this.title,
      description: this.description,
      body: this.body,
      tags: this.tags
    })
    let res: any
    let flashText: string
    if (this.article) {
      merge(this.article, article)
      this.article.dispose()
      res = await this.article.save()
      flashText = 'Article Saved!'
    } else {
      const m = new ArticleModel({}, { article })
      m.dispose() // prevent fetch trigger
      res = await m.create()
      flashText = 'Article Posted!'
    }
    Router.update(`//article/${res.article.slug}`, {
      with: {
        [FLASH_MESSAGE]: {
          type: 'success',
          text: flashText
        }
      }
    })
  }
}