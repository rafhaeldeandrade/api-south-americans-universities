import { LoadUniversitiesController } from '@/presentation/controllers/load-universities'

describe('LoadUniversities Controller', () => {
  it('should be defined', () => {
    expect(new LoadUniversitiesController()).toBeDefined()
  })

  it('should have a method named handle', () => {
    expect(new LoadUniversitiesController().handle).toBeDefined()
  })
})
