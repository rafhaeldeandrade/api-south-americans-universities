import { faker } from '@faker-js/faker'
import { DeleteUniversity } from '@/data/delete-university-use-case'

interface SutTypes {
  sut: DeleteUniversity
}

function makeSut(): SutTypes {
  const sut = new DeleteUniversity()
  return {
    sut
  }
}

describe('UpdateUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })

  it('should have a method named delete', async () => {
    const { sut } = makeSut()
    expect(sut.delete).toBeDefined()
  })
})
