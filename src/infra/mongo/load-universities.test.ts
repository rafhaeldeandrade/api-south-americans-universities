import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'

import { UniversityModel } from '@/infra/mongo/schemas/university'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoLoadUniversities } from './load-universities'

describe('MongoLoadTotalDocuments Integration Test', () => {
  let mongoServer: MongoMemoryServer = null as unknown as any
  jest.setTimeout(20000)
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

  it('should return the correct values when only skip and limit are provided', async () => {
    const TOTAL_DOCUMENTS = faker.datatype.number(80)
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
    const THIRD_PAGE = fakeUniversities.slice(40, 60).map((university) => ({
      id: university._id,
      name: university.name,
      country: university.country,
      stateProvince: university.stateProvince,
      domains: university.domains,
      webPages: university.webPages,
      alphaTwoCode: university.alphaTwoCode
    }))
    const sut = new MongoLoadUniversities()
    const universities = await sut.load({
      skip: 40,
      limit: 20
    })
    expect(universities).toEqual(THIRD_PAGE)
  })

  it('should return the correct total documents when country prop is provided', async () => {
    const TOTAL_DOCUMENTS_WITH_BRAZIL_AS_COUNTRY = faker.datatype.number({
      min: 100,
      max: 200
    })
    const TOTAL_DOCUMENTS_WITH_OTHER_COUNTRIES = faker.datatype.number(200)
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
    const FOURTH_PAGE = fakeBrazilianUniversities
      .slice(60, 80)
      .map((university) => ({
        id: university._id,
        name: university.name,
        country: university.country,
        stateProvince: university.stateProvince,
        domains: university.domains,
        webPages: university.webPages,
        alphaTwoCode: university.alphaTwoCode
      }))
    await UniversityModel.insertMany([
      ...fakeBrazilianUniversities,
      ...fakeOtherCountriesUniversities
    ])
    const sut = new MongoLoadUniversities()
    const universities = await sut.load({
      country: 'brazil',
      skip: 60,
      limit: 20
    })
    expect(universities).toEqual(FOURTH_PAGE)
  })
})
