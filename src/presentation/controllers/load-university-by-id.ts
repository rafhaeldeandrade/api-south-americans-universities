import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'

export class LoadUniversityByIdController implements Controller {
  async handle(props: HttpRequest): Promise<HttpResponse> {
    if (!props.params?.universityId) {
      return badRequest(new MissingParamError('universityId'))
    }
    return null as unknown as HttpResponse
  }
}
