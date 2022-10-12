import { LoadUniversitiesUseCase } from '@/domain/contracts'
import { HttpRequest } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  internalServerError,
  ok
} from '@/presentation/helpers/http-helper'

export class LoadUniversitiesController {
  constructor(
    private readonly loadUniversitiesUseCase: LoadUniversitiesUseCase
  ) {}

  async handle(httpRequest: HttpRequest) {
    try {
      if (isNaN(httpRequest?.query?.page)) {
        return badRequest(new InvalidParamError('Page must be a number'))
      }
      const universities = await this.loadUniversitiesUseCase.load({
        page: httpRequest?.query?.page,
        country: httpRequest?.query?.country
      })
      return ok(universities)
    } catch (e) {
      return internalServerError()
    }
  }
}
