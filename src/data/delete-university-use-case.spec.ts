import { faker } from '@faker-js/faker'
import { DeleteUniversity } from '@/data/delete-university-use-case'
import {
  DeleteUniversityRepository,
  DeleteUniversityRepositoryInput,
  DeleteUniversityRepositoryOutput
} from '@/data/contracts'

class DeleteUniversityRepositoryStub implements DeleteUniversityRepository {
  async delete(
    props: DeleteUniversityRepositoryInput
  ): Promise<DeleteUniversityRepositoryOutput> {
    return Promise.resolve()
  }
}

interface SutTypes {
  sut: DeleteUniversity
  deleteUniversityRepositoryStub: DeleteUniversityRepository
}

function makeSut(): SutTypes {
  const deleteUniversityRepositoryStub = new DeleteUniversityRepositoryStub()
  const sut = new DeleteUniversity(deleteUniversityRepositoryStub)
  return {
    sut,
    deleteUniversityRepositoryStub
  }
}

function mockProps() {
  return faker.datatype.uuid()
}

describe('UpdateUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named delete', async () => {
    const { sut } = makeSut()
    expect(sut.delete).toBeDefined()
  })

  it('should call deleteUniversityRepository.delete with the correct values', async () => {
    const { sut, deleteUniversityRepositoryStub } = makeSut()
    const props = mockProps()
    const deleteSpy = jest.spyOn(deleteUniversityRepositoryStub, 'delete')
    await sut.delete(props)
    expect(deleteSpy).toHaveBeenCalledTimes(1)
    expect(deleteSpy).toHaveBeenCalledWith(props)
  })
})