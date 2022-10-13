import { LoadUniversitiesUseCase } from '@/domain/contracts'
import {
  Controller,
  HttpRequest,
  SchemaValidator
} from '@/presentation/contracts'
import {
  badRequest,
  internalServerError,
  ok
} from '@/presentation/helpers/http-helper'

export class LoadUniversitiesController implements Controller {
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly loadUniversitiesUseCase: LoadUniversitiesUseCase
  ) {}

  async handle(request: HttpRequest) {
    try {
      const error = await this.schemaValidator.validate({
        page: request?.query?.page ? Number(request.query.page) : undefined,
        country: request?.query?.country
      })
      if (error) return badRequest(error)
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
