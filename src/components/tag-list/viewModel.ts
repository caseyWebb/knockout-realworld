import Query from '@profiscience/knockout-contrib-querystring'

type TagListViewModelParams = {
  tags: string[]
  limit?: number
}

export default class TagListViewModel {
  public tags: {
    text: string
    path: string
  }[]

  public numMore = 0

  constructor(params: TagListViewModelParams) {
    this.tags = take(params.tags, params.limit)
      .map((t) => ({
        text: t,
        path: `//?${Query.stringify({ feed: 'tag', tag: t })}`
      }))
    
    if (params.limit && params.tags.length > params.limit) {
      this.numMore = params.tags.length - params.limit
    }
  }
}

function take(arr: any[], n?: number) {
  if (!n || arr.length < n) return arr

  const ret = []
  for (let i = 0; i < n; i++) ret.push(arr[i])
  return ret
}