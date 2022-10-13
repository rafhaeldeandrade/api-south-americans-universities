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

  it('should have a method named update', async () => {
    const { sut } = makeSut()
    expect(sut.update).toBeDefined()
  })
})
