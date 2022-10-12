import { AddUniversityController } from '@/presentation/controllers/add-uninversity'

interface SutTypes {
  sut: AddUniversityController
}

function makeSut(): SutTypes {
  const sut = new AddUniversityController()
  return {
    sut
  }
}

describe('AddUniversity Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })
})
