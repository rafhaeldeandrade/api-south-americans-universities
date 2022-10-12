import { HttpResponse } from '@/presentation/contracts'
import {
  InvalidParamError,
  ResourceAlreadyExistsError
} from '@/presentation/errors'

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

export function ok(data: any): HttpResponse {
  return {
    statusCode: 200,
    body: data
  }
}

export function resourceNotFound(): HttpResponse {
  return {
    statusCode: 404,
    body: {}
  }
}

export function conflict(error: ResourceAlreadyExistsError): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: true,
      [error.name]: error.message
    }
  }
}

export function created(data: any): HttpResponse {
  return {
    statusCode: 201,
    body: data
  }
}
