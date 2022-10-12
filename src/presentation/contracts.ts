export interface Controller {
  handle: (request: HttpRequest) => Promise<HttpResponse>
}

interface HttpRequestQuery {
  [key: string]: any
}

export interface HttpRequest {
  query?: HttpRequestQuery
}

interface HttpResponseBody {
  [key: string]: any
}

export interface HttpResponse {
  statusCode: number
  body: HttpResponseBody
}
