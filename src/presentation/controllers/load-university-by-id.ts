import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'
import {
  ok,
  badRequest,
  internalServerError
} from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { LoadUniversityByIdUseCase } from '@/domain/contracts'

export class LoadUniversityByIdController implements Controller {
  constructor(
    private readonly loadUniversityByIdUseCase: LoadUniversityByIdUseCase
  ) {}

  async handle(props: HttpRequest): Promise<HttpResponse> {
    try {
      if (!props.params?.universityId) {
        return badRequest(new MissingParamError('universityId'))
      }
      const university = await this.loadUniversityByIdUseCase.load({
        universityId: props.params.universityId
      })
      return ok(university)
    } catch (e) {
      return internalServerError()
    }
  }
}
