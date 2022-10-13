import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'

export class UpdateUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    await this.schemaValidator.validate({
      webPages: request?.body?.webPages,
      name: request?.body?.name,
      domains: request?.body?.domains,
      universityId: request?.params?.universityId
    })
    return null as unknown as HttpResponse
  }
}
