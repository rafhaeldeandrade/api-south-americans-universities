import { LoadUniversityByIdController } from '@/presentation/controllers/load-university-by-id'

interface SutTypes {
  sut: LoadUniversityByIdController
}

function makeSut(): SutTypes {
  const sut = new LoadUniversityByIdController()
  return {
    sut
  }
}

describe('LoadUniversityById Controller', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named handle', () => {
    const { sut } = makeSut()
    expect(sut.handle).toBeDefined()
  })
})
