import { AddUniversityUseCase } from '@/domain/contracts'
import {
  Controller,
  HttpRequest,
  HttpResponse,
  SchemaValidator
} from '@/presentation/contracts'
import {
  badRequest,
  conflict,
  created,
  internalServerError
} from '@/presentation/helpers/http-helper'
import { ResourceAlreadyExistsError } from '../errors'

export class AddUniversityController implements Controller {
  constructor(
    private readonly schemaValidator: SchemaValidator,
    private readonly addUniversityUseCase: AddUniversityUseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const error = await this.schemaValidator.validate(request.body)
      if (error) return badRequest(error)
      const savedUniversity = await this.addUniversityUseCase.add({
        name: request?.body?.name,
        domains: request?.body?.domains,
        country: request?.body?.country,
        stateProvince: request?.body?.stateProvince,
        alphaTwoCode: request?.body?.alphaTwoCode,
        webPages: request?.body?.webPages
      })
      if (!savedUniversity)
        return conflict(
          new ResourceAlreadyExistsError('University already exists')
        )
      return created(savedUniversity)
    } catch (e) {
      return internalServerError()
    }
  }
}
