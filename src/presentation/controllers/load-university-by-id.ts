import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'
import {
  ok,
  badRequest,
  internalServerError,
  resourceNotFound
} from '@/presentation/helpers/http-helper'
import { LoadUniversityByIdUseCase } from '@/domain/contracts'

export class LoadUniversityByIdController implements Controller {
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly loadUniversityByIdUseCase: LoadUniversityByIdUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidator.validate({
        universityId: request?.params?.universityId
      })
      if (error) return badRequest(error)
      const university = await this.loadUniversityByIdUseCase.load({
        universityId: request?.params?.universityId
      })
      if (!university) return resourceNotFound()
      return ok(university)
    } catch (e) {
      return internalServerError()
    }
  }
}
