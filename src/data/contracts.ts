import { SavedUniversity } from '@/domain/contracts'

export type LoadUniversitiesRepositoryInput = {
  skip: number
  limit: number
  country?: string
}

export type LoadUniversitiesRepositoryOutput = SavedUniversity[]

export interface LoadUniversitiesRepository {
  load: (
    props: LoadUniversitiesRepositoryInput
  ) => Promise<LoadUniversitiesRepositoryOutput>
}

export type CountTotalDocumentsRepositoryInput = {
  country?: string
}

export type CountTotalDocumentsRepositoryOutput = number
export interface CountTotalDocumentsRepository {
  count: (
    props: CountTotalDocumentsRepositoryInput
  ) => Promise<CountTotalDocumentsRepositoryOutput>
}
