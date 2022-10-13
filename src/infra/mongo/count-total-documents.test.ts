import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'

import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoCountTotalDocuments } from './count-total-documents'

describe('MongoLoadTotalDocuments Integration Test', () => {
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

  it('should return the correct total documents when no prop is provided', async () => {
    const TOTAL_DOCUMENTS = faker.datatype.number(200)
    const fakeUniversities = Array.from({ length: TOTAL_DOCUMENTS }).map(
      () => ({
        _id: new mongoose.Types.ObjectId().toHexString(),
        stateProvince: faker.address.state(),
        alphaTwoCode: faker.address.countryCode(),
        webPages: [faker.internet.url()],
        country: faker.address.country(),
        name: faker.company.name(),
        domains: [faker.internet.domainName()]
      })
    )
    await UniversityModel.insertMany(fakeUniversities)
    const sut = new MongoCountTotalDocuments(UniversityModel)
    const totalDocuments = await sut.count({})
    expect(totalDocuments).toBe(TOTAL_DOCUMENTS)
  })

  it('should return the correct total documents when country prop is provided', async () => {
    const TOTAL_DOCUMENTS_WITH_BRAZIL_AS_COUNTRY = faker.datatype.number(50)
    const TOTAL_DOCUMENTS_WITH_OTHER_COUNTRIES = faker.datatype.number(50)
    const fakeBrazilianUniversities = Array.from({
      length: TOTAL_DOCUMENTS_WITH_BRAZIL_AS_COUNTRY
    }).map(() => ({
      _id: new mongoose.Types.ObjectId().toHexString(),
      stateProvince: faker.address.state(),
      alphaTwoCode: faker.address.countryCode(),
      webPages: [faker.internet.url()],
      country: 'brazil',
      name: faker.company.name(),
      domains: [faker.internet.domainName()]
    }))
    const fakeOtherCountriesUniversities = Array.from({
      length: TOTAL_DOCUMENTS_WITH_OTHER_COUNTRIES
    }).map(() => ({
      _id: new mongoose.Types.ObjectId().toHexString(),
      stateProvince: faker.address.state(),
      alphaTwoCode: faker.address.countryCode(),
      webPages: [faker.internet.url()],
      country: faker.address.country(),
      name: faker.company.name(),
      domains: [faker.internet.domainName()]
    }))
    await UniversityModel.insertMany([
      ...fakeBrazilianUniversities,
      ...fakeOtherCountriesUniversities
    ])
    const sut = new MongoCountTotalDocuments(UniversityModel)
    const totalDocuments = await sut.count({
      country: 'brazil'
    })
    expect(totalDocuments).toBe(TOTAL_DOCUMENTS_WITH_BRAZIL_AS_COUNTRY)
  })
})
