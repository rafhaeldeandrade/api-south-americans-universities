import { UpdateUniversityUseCase } from '@/domain/contracts'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'
import {
  badRequest,
  internalServerError
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
      await this.updateUniversityUseCase.update({
        webPages: request?.body?.webPages,
        name: request?.body?.name,
        domains: request?.body?.domains,
        universityId: request?.params?.universityId
      })
      return null as unknown as HttpResponse
    } catch (e) {
      return internalServerError()
    }
  }
}
