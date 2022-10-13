import { SavedUniversity, University } from '@/domain/contracts'

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

export type LoadUniversityBypropsRepositoryInput = {
  name?: string
  country?: string
  stateProvince?: string | null
}

export type LoadUniversityBypropsRepositoryOutput = SavedUniversity | null

export interface LoadUniversityByPropsRepository {
  load: (
    props: LoadUniversityBypropsRepositoryInput
  ) => Promise<LoadUniversityByIdRepositoryOutput>
}

export type AddUniversityRepositoryInput = University

export type AddUniversityRepositoryOutput = SavedUniversity | null

export interface AddUniversityRepository {
  add: (
    props: AddUniversityRepositoryInput
  ) => Promise<AddUniversityRepositoryOutput>
}

export type UpdateUniversityRepositoryInput = {
  id: string
  name: string
  domains: string[]
  webPages: string[]
}

export type UpdateUniversityRepositoryOutput = SavedUniversity | null

export interface UpdateUniversityRepository {
  update: (
    props: UpdateUniversityRepositoryInput
  ) => Promise<UpdateUniversityRepositoryOutput>
}

export type DeleteUniversityRepositoryInput = string

export type DeleteUniversityRepositoryOutput = void

export interface DeleteUniversityRepository {
  delete: (
    id: DeleteUniversityRepositoryInput
  ) => Promise<DeleteUniversityRepositoryOutput>
}
