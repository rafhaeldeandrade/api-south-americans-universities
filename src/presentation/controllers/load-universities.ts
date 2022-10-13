import { LoadUniversitiesUseCase } from '@/domain/contracts'
import { Controller, HttpRequest } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import {
  badRequest,
  internalServerError,
  ok
} from '@/presentation/helpers/http-helper'

export class LoadUniversitiesController implements Controller {
  constructor(
    private readonly loadUniversitiesUseCase: LoadUniversitiesUseCase
  ) {}

  async handle(request: HttpRequest) {
    try {
      if (request?.query?.page && isNaN(request.query.page)) {
        return badRequest(new InvalidParamError('Page must be a number'))
      }
      const universities = await this.loadUniversitiesUseCase.load({
        page: request?.query?.page,
        country: request?.query?.country
      })
      return ok(universities)
    } catch (e) {
      return internalServerError()
    }
  }
}
