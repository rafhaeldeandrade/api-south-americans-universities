import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'
import {
  ok,
  badRequest,
  internalServerError,
  resourceNotFound
} from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { LoadUniversityByIdUseCase } from '@/domain/contracts'

export class LoadUniversityByIdController implements Controller {
  constructor(
    private readonly loadUniversityByIdUseCase: LoadUniversityByIdUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      if (!request.params?.universityId) {
        return badRequest(new MissingParamError('universityId'))
      }
      const university = await this.loadUniversityByIdUseCase.load({
        universityId: request.params.universityId
      })
      if (!university) return resourceNotFound()
      return ok(university)
    } catch (e) {
      return internalServerError()
    }
  }
}
