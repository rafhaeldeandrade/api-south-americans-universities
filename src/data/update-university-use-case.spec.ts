import { UpdateUniversity } from '@/data/update-university-use-case'

interface SutTypes {
  sut: UpdateUniversity
}

function makeSut(): SutTypes {
  const sut = new UpdateUniversity()
  return {
    sut
  }
}

describe('UpdateUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })
})
