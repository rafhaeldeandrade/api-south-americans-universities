import { UpdateUniversityController } from '@/presentation/controllers/update-university'

interface SutTypes {
  sut: UpdateUniversityController
}

function makeSut(): SutTypes {
  const sut = new UpdateUniversityController()
  return {
    sut
  }
}

describe('UpdateUniversityController', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })
})
