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

  it('should return 400 if universityId is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {}
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
