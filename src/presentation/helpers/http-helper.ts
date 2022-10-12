import { HttpResponse } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'

export function badRequest(error: InvalidParamError): HttpResponse {
  return {
    statusCode: 400,
    body: {
      [error.name]: error.message
    }
  }
}
