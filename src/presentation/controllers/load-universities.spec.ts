import { faker } from '@faker-js/faker'
import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  internalServerError,
  ok
} from '@/presentation/helpers/http-helper'
import { LoadUniversitiesUseCase } from '@/domain/contracts'

const LoadUniversitiesUseCaseStubReturn: any[] = []
class LoadUniversitiesUseCaseStub implements LoadUniversitiesUseCase {
  async load() {
    return LoadUniversitiesUseCaseStubReturn
  }
}

interface SutTypes {
  sut: LoadUniversitiesController
  loadUniversitiesUseCaseStub: LoadUniversitiesUseCase
}

function makeSut(): SutTypes {
  const loadUniversitiesUseCaseStub = new LoadUniversitiesUseCaseStub()
  const sut = new LoadUniversitiesController(loadUniversitiesUseCaseStub)
  return { sut, loadUniversitiesUseCaseStub }
}

describe('LoadUniversities Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should return 400 if query.page is provided but it is not a number', async () => {
    const { sut } = makeSut()
    const fakeHttpRequest = {
      query: {
        page: faker.random.word()
      }
    }
    const response = await sut.handle(fakeHttpRequest)
    expect(response).toEqual(
      badRequest(new InvalidParamError('Page must be a number'))
    )
  })

  it('should call loadUniversitiesUseCase with correct values', async () => {
    const { sut, loadUniversitiesUseCaseStub } = makeSut()
    const loadSpy = jest.spyOn(loadUniversitiesUseCaseStub, 'load')
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    await sut.handle(fakeHttpRequest)
    expect(loadSpy).toHaveBeenCalledTimes(1)
    expect(loadSpy).toHaveBeenCalledWith({
      page: fakeHttpRequest.query.page,
      country: fakeHttpRequest.query.country
    })
  })

  it('should return 500 if loadUniversitiesUseCase throws', async () => {
    const { sut, loadUniversitiesUseCaseStub } = makeSut()
    jest
      .spyOn(loadUniversitiesUseCaseStub, 'load')
      .mockRejectedValueOnce(new Error())
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    const promise = sut.handle(fakeHttpRequest)
    await expect(promise).resolves.toEqual(internalServerError())
  })

  it('should return 200 on success', async () => {
    const { sut } = makeSut()
    const fakeHttpRequest = {
      query: {
        page: faker.datatype.number(20),
        country: faker.address.country()
      }
    }
    const promise = sut.handle(fakeHttpRequest)
    await expect(promise).resolves.toEqual(
      ok(LoadUniversitiesUseCaseStubReturn)
    )
  })
})
