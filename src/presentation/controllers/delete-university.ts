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

export class DeleteUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidator.validate({
        universityId: request?.params?.universityId
      })
      if (error) return badRequest(error)
      return null as unknown as HttpResponse
    } catch (e) {
      return internalServerError()
    }
  }
}