import { DeleteUniversityUseCase } from '@/domain/contracts'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'
import {
  ok,
  badRequest,
  internalServerError
} from '@/presentation/helpers/http-helper'

export class DeleteUniversityController implements Controller {
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly deleteUniversityUseCase: DeleteUniversityUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidator.validate({
        universityId: request?.params?.universityId
      })
      if (error) return badRequest(error)
      const universityId = await this.deleteUniversityUseCase.delete(
        request?.params?.universityId
      )
      return ok(universityId)
    } catch (e) {
      return internalServerError()
    }
  }
}
