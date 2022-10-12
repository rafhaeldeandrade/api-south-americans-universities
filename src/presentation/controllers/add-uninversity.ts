import { Controller, SchemaValidator } from '@/presentation/contracts'
import { badRequest } from '../helpers/http-helper'

export class AddUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: any): Promise<any> {
    const error = await this.schemaValidator.validate(request.body)
    if (error) return badRequest(error)
    return null
  }
}
