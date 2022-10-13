import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'
import { internalServerError } from '@/presentation/helpers/http-helper'

export class DeleteUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      await this.schemaValidator.validate({
        universityId: request?.params?.universityId
      })
      return null as unknown as HttpResponse
    } catch (e) {
      return internalServerError()
    }
  }
}
