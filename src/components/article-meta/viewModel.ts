import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'
import { Router } from '@profiscience/knockout-contrib-router'
import { FLASH_MESSAGE } from '@profiscience/knockout-contrib-router-middleware'
import { ArticleModel } from 'lib/models/article'

export default class ArticleMetaComponent extends ViewModelConstructorBuilder {
  public article: ArticleModel

  constructor({ article }: { article: ArticleModel }) {
    super()
    this.article = article
  }

  public async deleteArticle() {
    await this.article.delete()
    Router.update('//', {
      with: {
        [FLASH_MESSAGE]: {
          type: 'success',
          text: 'Article Deleted!'
        }
      }
    })
  }
}