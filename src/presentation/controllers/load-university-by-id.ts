import { Controller, HttpRequest, HttpResponse } from '@/presentation/contracts'
import { badRequest } from '@/presentation/helpers/http-helper'
import { MissingParamError } from '@/presentation/errors'
import { LoadUniversityByIdUseCase } from '@/domain/contracts'

export class LoadUniversityByIdController implements Controller {
  constructor(
    private readonly loadUniversityByIdUseCase: LoadUniversityByIdUseCase
  ) {}

  async handle(props: HttpRequest): Promise<HttpResponse> {
    if (!props.params?.universityId) {
      return badRequest(new MissingParamError('universityId'))
    }
    await this.loadUniversityByIdUseCase.load({
      universityId: props.params.universityId
    })
    return null as unknown as HttpResponse
  }
}
