import { HttpResponse } from '@/presentation/contracts'
import { InvalidParamError } from '@/presentation/errors'

export function badRequest(error: InvalidParamError): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: true,
      [error.name]: error.message
    }
  }
}

export function internalServerError(): HttpResponse {
  return {
    statusCode: 500,
    body: {
      error: true,
      InternalServerError: 'Something went wrong, try again later'
    }
  }
}
