import { Controller, SchemaValidator } from '@/presentation/contracts'

export class AddUniversityController implements Controller {
  constructor(private readonly schemaValidator: SchemaValidator) {}

  async handle(request: any): Promise<any> {
    await this.schemaValidator.validate(request.body)
    return null
  }
}
