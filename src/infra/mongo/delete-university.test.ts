import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoDeleteUniversity } from '@/infra/mongo/delete-university'

describe('MongoDeleteUniversity Integration test', () => {
  let mongoServer: MongoMemoryServer = null as unknown as any
  afterEach(async () => {
    await UniversityModel.deleteMany({})
  })

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { dbName: 'universities-test' })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  it('should delete the correct document', async () => {
    const fakeId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: fakeId,
      name: faker.name.fullName(),
      country: faker.address.country(),
      stateProvince: faker.address.state(),
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoDeleteUniversity()
    const result = await sut.delete(fakeId)
    const document = await UniversityModel.findById(fakeId, {}, { lean: true })
    expect(result).toBe(true)
    expect(document).toBeNull()
  })
})
