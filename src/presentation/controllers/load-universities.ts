import { HttpRequest } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'

export class LoadUniversitiesController {
  handle(httpRequest: HttpRequest) {
    if (isNaN(httpRequest?.query?.page)) {
      return badRequest(new InvalidParamError('Page must be a number'))
    }
    return null
  }
}
