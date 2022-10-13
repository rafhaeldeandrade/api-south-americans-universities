import { UpdateUniversityUseCase } from '@/domain/contracts'
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

export class UpdateUniversityController implements Controller {
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly updateUniversityUseCase: UpdateUniversityUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidator.validate({
        webPages: request?.body?.webPages,
        name: request?.body?.name,
        domains: request?.body?.domains,
        universityId: request?.params?.universityId
      })
      if (error) return badRequest(error)
      const university = await this.updateUniversityUseCase.update({
        webPages: request?.body?.webPages,
        name: request?.body?.name,
        domains: request?.body?.domains,
        universityId: request?.params?.universityId
      })
      if (!university) return resourceNotFound()
      return ok(university)
    } catch (e) {
      return internalServerError()
    }
  }
}
