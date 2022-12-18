export type ResultType = {
  checkedOn: Date
  indexedOn: Date
  serb: string
}

export type EntriesType = {
  createdOn: Date
  indexedCount: number
  indexedTotal: number
  indexedValidCount: number
  language: string
  latestIndexedOn: Date
  results: ResultType[]
  title: string
  url: string
  validUntil: Date
}

export type RowType = {
  category: string
  createdOn: Date
  domain: string
  entries: EntriesType[]
  id: string
  title: string
  validUntil: Date
}

export type DateType = {
  date: string
  time: string
  smalldate: string
}