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

  public addTag(tag: string) {
    if (this.article.tagList.indexOf(tag) < 0) this.article.tagList.push(tag)
  }

  public removeTag(tag: string) {
    this.article.tagList.remove(tag)
  }

  public tagListKeydownHandler(data: any, e: KeyboardEvent) {
    const delimiters = [
      9,  // tab
      13, // enter
      32, // space
      39, // right arrow
      188 // comma
    ]
    if (delimiters.indexOf(e.keyCode) > -1) {
      const $input = e.target as HTMLInputElement
      const tag = $input.value
      if (tag) {
        $input.value = ''
        return this.addTag(tag)
      }
    }
    return true
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