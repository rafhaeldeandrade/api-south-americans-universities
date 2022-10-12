import { LoadUniversityById } from '@/data/load-university-by-id-use-case'

interface SutTypes {
  sut: LoadUniversityById
}

function makeSut(): SutTypes {
  const sut = new LoadUniversityById()
  return { sut }
}

describe('LoadUniversityById use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })
})
