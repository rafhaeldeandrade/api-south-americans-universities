import { DeleteUniversityController } from '@/presentation/controllers/delete-university'
import { SchemaValidator } from '@/presentation/contracts'
import { faker } from '@faker-js/faker'
import {
  DeleteUniversityUseCase,
  DeleteUniversityUseCaseInput,
  DeleteUniversityUseCaseOutput
} from '@/domain/contracts'

class SchemaValidatorStub implements SchemaValidator {
  async validate(input: any): Promise<Error | null> {
    return null
  }
}

const deleteUniversityUseCaseStubReturn = {
  id: faker.datatype.uuid()
}
class DeleteUniversityUseCaseStub implements DeleteUniversityUseCase {
  async delete(
    universityId: DeleteUniversityUseCaseInput
  ): Promise<DeleteUniversityUseCaseOutput> {
    return deleteUniversityUseCaseStubReturn
  }
}

interface SutTypes {
  sut: DeleteUniversityController
  schemaValidatorStub: SchemaValidator
  deleteUniversityUseCaseStub: DeleteUniversityUseCase
}

function makeSut(): SutTypes {
  const schemaValidatorStub = new SchemaValidatorStub()
  const deleteUniversityUseCaseStub = new DeleteUniversityUseCaseStub()
  const sut = new DeleteUniversityController(
    schemaValidatorStub,
    deleteUniversityUseCaseStub
  )
  return {
    sut,
    schemaValidatorStub,
    deleteUniversityUseCaseStub
  }
}

function mockRequest() {
  return {
    params: {
      universityId: faker.datatype.uuid()
    }
  }
}

describe('AddUniversity Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should call schemaValidator.validate with the correct values', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    const validateSpy = jest.spyOn(schemaValidatorStub, 'validate')
    await sut.handle(request)
    expect(validateSpy).toHaveBeenCalledTimes(1)
    expect(validateSpy).toHaveBeenCalledWith({
      universityId: request.params.universityId
    })
  })

  it('should return 500 if schemaValidator.validate throws an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    jest
      .spyOn(schemaValidatorStub, 'validate')
      .mockRejectedValueOnce(new Error())
    const promise = sut.handle(request)
    await expect(promise).resolves.toEqual({
      statusCode: 500,
      body: {
        error: true,
        InternalServerError: 'Something went wrong, try again later'
      }
    })
  })

  it('should return 400 if schemaValidator.validate returns an error', async () => {
    const { sut, schemaValidatorStub } = makeSut()
    const request = mockRequest()
    const error = new Error('teste')
    jest.spyOn(schemaValidatorStub, 'validate').mockResolvedValueOnce(error)
    const promise = sut.handle(request)
    await expect(promise).resolves.toEqual({
      statusCode: 400,
      body: {
        error: true,
        [error.name]: error.message
      }
    })
  })

  it('should call deleteUniversityUseCase.delete with the correct values', async () => {
    const { sut, deleteUniversityUseCaseStub } = makeSut()
    const addSpy = jest.spyOn(deleteUniversityUseCaseStub, 'delete')
    const request = mockRequest()
    await sut.handle(request)
    expect(addSpy).toHaveBeenCalledTimes(1)
    expect(addSpy).toHaveBeenCalledWith(request.params.universityId)
  })
})
