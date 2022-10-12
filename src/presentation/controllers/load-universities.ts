import { LoadUniversitiesUseCase } from '@/domain/contracts'
import { HttpRequest } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  internalServerError
} from '@/presentation/helpers/http-helper'

export class LoadUniversitiesController {
  constructor(
    private readonly loadDeliveriesUseCaseStub: LoadUniversitiesUseCase
  ) {}

  async handle(httpRequest: HttpRequest) {
    try {
      if (isNaN(httpRequest?.query?.page)) {
        return badRequest(new InvalidParamError('Page must be a number'))
      }
      await this.loadDeliveriesUseCaseStub.load({
        page: httpRequest?.query?.page,
        country: httpRequest?.query?.country
      })
    } catch (e) {
      return internalServerError()
    }
  }
}
