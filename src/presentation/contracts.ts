export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

interface HttpRequestQuery {
  [key: string]: any
}

interface HttpRequestParams {
  [key: string]: any
}

interface HttpRequestBody {
  [key: string]: any
}

export interface HttpRequest {
  query?: HttpRequestQuery
  params?: HttpRequestParams
  body?: HttpRequestBody
}

interface HttpResponseBody {
  [key: string]: any
}

export interface HttpResponse {
  statusCode: number
  body: HttpResponseBody
}

export interface SchemaValidator {
  validate: (input: any) => Promise<Error | null>
}
