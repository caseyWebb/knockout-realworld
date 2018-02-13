import { Router } from '@profiscience/knockout-contrib-router'
import { FLASH_MESSAGE } from '@profiscience/knockout-contrib-router-middleware'
import { EditableArticleModel, NewArticleModel } from 'lib/models/article'

export type ArticleFormParams = {
  article?: EditableArticleModel
}

export default class ArticleFormViewModel {
  public article: EditableArticleModel
  public isNew = false

  constructor(params: ArticleFormParams) {
    if (params.article) {
      this.article = params.article
    } else {
      this.isNew = true
      this.article = new NewArticleModel()
    }
  }

  public async save() {
    this.article.dispose()
    
    const [method, flashText] = this.isNew
      ? ['create', 'Article Posted!']
      : ['save', 'Article Saved!']
    
    const { article: { slug } } = await (this.article as any)[method]()
    
    Router.update(`//article/${slug}`, {
      with: {
        [FLASH_MESSAGE]: {
          type: 'success',
          text: flashText
        }
      }
    })
  }
}