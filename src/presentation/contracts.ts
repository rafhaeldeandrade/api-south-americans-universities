export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

interface HttpRequestQuery {
  [key: string]: any
}

interface HttpRequestParams {
  [key: string]: any
}

export interface HttpRequest {
  query?: HttpRequestQuery
  params?: HttpRequestParams
}

interface HttpResponseBody {
  [key: string]: any
}

export interface HttpResponse {
  statusCode: number
  body: HttpResponseBody
}
