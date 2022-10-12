import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'
import {
  ok,
  badRequest,
  internalServerError,
  resourceNotFound
} from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { LoadUniversityByIdUseCase } from '@/domain/contracts'
import { NOTFOUND } from 'dns'

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
      if (!university) return resourceNotFound()
      return ok(university)
    } catch (e) {
      if (e instanceof Error) console.log(e.name)
      return internalServerError()
    }
  }
}
