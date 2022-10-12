import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoAddUniversity } from '@/infra/mongo/add-university'
import { UniversityModel } from '@/infra/mongo/schemas/university'

describe('MongoAddUniversity Integration test', () => {
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

  it('should return the correct document', async () => {
    const fakeUniversity = {
      name: faker.name.fullName(),
      country: faker.address.country(),
      stateProvince: faker.address.state(),
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    const sut = new MongoAddUniversity()
    const result = await sut.add(fakeUniversity)
    const document = await UniversityModel.findById(result?.id)
    expect(result).toEqual({
      id: document?._id.toString(),
      name: fakeUniversity.name,
      country: fakeUniversity.country,
      stateProvince: fakeUniversity.stateProvince,
      domains: fakeUniversity.domains,
      webPages: fakeUniversity.webPages,
      alphaTwoCode: fakeUniversity.alphaTwoCode
    })
  })
})
