import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'

export class DeleteUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidator.validate({
      universityId: request?.params?.universityId
    })
    return null as unknown as HttpResponse
  }
}
