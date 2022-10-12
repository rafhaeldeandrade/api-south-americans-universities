import { MongoLoadUniversityById } from '@/infra/mongo/load-university-by-id'
import { faker } from '@faker-js/faker'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { UniversityModel } from './schemas/university'

describe('MongoLoadUniversityById Integration test', () => {
  let mongoServer: MongoMemoryServer = null as unknown as any
  afterEach(async () => {
    await UniversityModel.deleteMany({})
  })

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { dbName: 'universities-test' })
  })

  it('should return the correct document', async () => {
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: documentId,
      name: faker.name.fullName(),
      country: faker.address.country(),
      stateProvince: faker.address.state(),
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoLoadUniversityById()
    const result = await sut.load(documentId)
    expect(result).toEqual({
      id: documentId,
      name: fakeUniversity.name,
      country: fakeUniversity.country,
      stateProvince: fakeUniversity.stateProvince,
      domains: fakeUniversity.domains,
      webPages: fakeUniversity.webPages,
      alphaTwoCode: fakeUniversity.alphaTwoCode
    })
  })

  it('should return null if document is not found', async () => {
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const sut = new MongoLoadUniversityById()
    const result = await sut.load(documentId)
    expect(result).toBeNull()
  })
})
