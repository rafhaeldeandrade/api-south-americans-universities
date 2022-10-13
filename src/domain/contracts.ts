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
  page?: number
  country?: string
}

export type LoadUniversitiesUseCaseOutput = {
  totalPages: number
  universities: {
    id: string
    name: string
    country: string
    stateProvince: string | null
  }[]
}

export interface LoadUniversitiesUseCase {
  load: (
    props: LoadUniversitiesUseCaseInput
  ) => Promise<LoadUniversitiesUseCaseOutput>
}

export type LoadUniversityByIdUseCaseInput = {
  universityId: string
}

export type LoadUniversityByIdUseCaseOutput = SavedUniversity | null

export interface LoadUniversityByIdUseCase {
  load: (
    props: LoadUniversityByIdUseCaseInput
  ) => Promise<LoadUniversityByIdUseCaseOutput>
}

export type AddUniversityUseCaseInput = University

export type AddUniversityUseCaseOutput = SavedUniversity | null

export interface AddUniversityUseCase {
  add: (
    university: AddUniversityUseCaseInput
  ) => Promise<AddUniversityUseCaseOutput>
}

export type UpdateUniversityUseCaseInput = {
  universityId: string
  name: string
  domains: string[]
  webPages: string[]
}

export type UpdateUniversityUseCaseOutput = SavedUniversity | null
export interface UpdateUniversityUseCase {
  update: (
    props: UpdateUniversityUseCaseInput
  ) => Promise<UpdateUniversityUseCaseOutput>
}

export type DeleteUniversityUseCaseInput = string

export type DeleteUniversityUseCaseOutput = {
  id: string
} | null

export interface DeleteUniversityUseCase {
  delete: (
    universityId: DeleteUniversityUseCaseInput
  ) => Promise<DeleteUniversityUseCaseOutput>
}
