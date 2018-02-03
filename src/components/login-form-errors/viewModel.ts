import { ViewModelConstructorBuilder } from '@profiscience/knockout-contrib-model'

export type LoginFormErrorsParams = {
  errors: { [k: string]: string[] }
}

export default class LoginFormErrorsViewModel extends ViewModelConstructorBuilder {
  public errors: KnockoutComputed<string[]>

  constructor(params: LoginFormErrorsParams) {
    super()

    this.errors = ko.pureComputed(() => {
      const { errors } = ko.toJS(params)
      if (!errors) return []
      const fields = Object.keys(errors)
      return fields.reduce((messages, field) => [
        ...messages,
        ...(errors[field].map((e) => `${field} ${e}`))
      ], [] as string[])
    })
  }
}