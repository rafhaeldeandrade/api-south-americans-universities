import { Controller } from '@/presentation/contracts'
import { Request, Response } from 'express'

export function adaptRoute(controller: Controller) {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      headers: req.headers,
      params: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    return res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
