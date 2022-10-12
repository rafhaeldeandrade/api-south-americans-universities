import { LoadUniversities } from '@/data/load-universities-use-case'

describe('LoadUniversitiesUseCase', () => {
  it('should be defined', () => {
    expect(new LoadUniversities()).toBeDefined()
  })

  it('should have a method named load', () => {
    expect(new LoadUniversities().load).toBeDefined()
  })
})
