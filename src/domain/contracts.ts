export interface SavedUniversity extends University {
  id: string
}

export interface University {
  stateProvince: string | null
  alphaTwoCode: string
  webPages: string[]
  country: string
  name: string
  domains: string[]
}
