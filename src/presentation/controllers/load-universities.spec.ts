import { faker } from '@faker-js/faker'
import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest } from '../helpers/http-helper'

interface SutTypes {
  sut: LoadUniversitiesController
}

function makeSut(): SutTypes {
  const sut = new LoadUniversitiesController()
  return { sut }
}

describe('LoadUniversities Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })

  it('should return 400 if query.page is provided but it is not a number', () => {
    const { sut } = makeSut()
    const fakeHttpRequest = {
      query: {
        page: faker.random.word()
      }
    }
    const response = sut.handle(fakeHttpRequest)
    expect(response).toEqual(
      badRequest(new InvalidParamError('Page must be a number'))
    )
  })
})
