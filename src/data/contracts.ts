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

export type LoadUniversityByIdRepositoryInput = string

export type LoadUniversityByIdRepositoryOutput = SavedUniversity | null
export interface LoadUniversityByIdRepository {
  load: (
    id: LoadUniversityByIdRepositoryInput
  ) => Promise<LoadUniversityByIdRepositoryOutput>
}
