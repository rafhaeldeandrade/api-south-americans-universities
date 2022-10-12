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

export type LoadUniversitiesUseCaseInput = {
  page: number
  country: string
}

export type LoadUniversitiesUseCaseOutput = {
  id: string
  name: string
  country: string
  stateProvince: string | null
}

export interface LoadUniversitiesUseCase {
  load: (
    props: LoadUniversitiesUseCaseInput
  ) => Promise<LoadUniversitiesUseCaseOutput[]>
}
