export class InvalidParamError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidParamError'
  }
}

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
