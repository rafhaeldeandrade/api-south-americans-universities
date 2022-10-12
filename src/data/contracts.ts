import { SavedUniversity } from '@/domain/contracts'

export type LoadUniversitiesRepositoryInput = {
  page?: number
  country?: string
}

export type LoadUniversitiesRepositoryOutput = SavedUniversity[]

export interface LoadUniversitiesRepository {
  load: (
    props: LoadUniversitiesRepositoryInput
  ) => Promise<LoadUniversitiesRepositoryOutput>
}
