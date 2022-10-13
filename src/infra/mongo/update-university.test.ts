import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoAddUniversity } from '@/infra/mongo/add-university'
import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoUpdateUniversity } from './update-university'

describe('MongoUpdateUniversity Integration test', () => {
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
    const fakeId = new mongoose.Types.ObjectId().toHexString()
    const fakeDomains = [faker.internet.domainName()]
    const fakeWebPages = [faker.internet.url()]
    const fakeName = faker.name.fullName()
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
    const sut = new MongoUpdateUniversity()
    await sut.update({
      id: fakeId,
      name: fakeName,
      domains: fakeDomains,
      webPages: fakeWebPages
    })
    const document = await UniversityModel.findById(fakeId, {}, { lean: true })
    expect(document).toEqual({
      _id: new mongoose.Types.ObjectId(fakeId),
      name: fakeName,
      country: fakeUniversity.country,
      stateProvince: fakeUniversity.stateProvince,
      domains: fakeDomains,
      webPages: fakeWebPages,
      alphaTwoCode: fakeUniversity.alphaTwoCode
    })
  })
})
