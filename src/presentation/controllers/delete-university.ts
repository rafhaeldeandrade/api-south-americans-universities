import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'

export class DeleteUniversityController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    return null as unknown as HttpResponse
  }
}
