import { Controller, SchemaValidator } from '@/presentation/contracts'
import { badRequest, internalServerError } from '../helpers/http-helper'

export class AddUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: any): Promise<any> {
    try {
      const error = await this.schemaValidator.validate(request.body)
      if (error) return badRequest(error)
      return null
    } catch (e) {
      return internalServerError()
    }
  }
}
