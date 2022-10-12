import { AddUniversity } from '@/data/add-university-use-case'

interface SutTypes {
  sut: AddUniversity
}

function makeSut(): SutTypes {
  const sut = new AddUniversity()
  return { sut }
}

describe('AddUniversity use case', () => {
  it('should be defined', () => {
    const { sut } = makeSut()
    expect(sut).toBeDefined()
  })
})
