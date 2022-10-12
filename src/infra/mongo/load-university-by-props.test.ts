import mongoose from 'mongoose'
import { faker } from '@faker-js/faker'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoLoadUniversityByProps } from '@/infra/mongo/load-university-by-props'
import { UniversityModel } from '@/infra/mongo/schemas/university'

describe('MongoLoadUniversityByProps Integration test', () => {
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

  it('should return the correct document when country is provided', async () => {
    const fakeCountry = faker.address.country()
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: documentId,
      name: faker.name.fullName(),
      country: fakeCountry,
      stateProvince: faker.address.state(),
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoLoadUniversityByProps()
    const result = await sut.load({
      country: fakeCountry
    })
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

  it('should return the correct document when stateProvince is provided', async () => {
    const fakeStateProvince = faker.address.state()
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: documentId,
      name: faker.name.fullName(),
      country: faker.address.country(),
      stateProvince: fakeStateProvince,
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoLoadUniversityByProps()
    const result = await sut.load({
      stateProvince: fakeStateProvince
    })
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

  it('should return the correct document when name is provided', async () => {
    const fakeName = faker.name.fullName()
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: documentId,
      name: fakeName,
      country: faker.address.country(),
      stateProvince: faker.address.state(),
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoLoadUniversityByProps()
    const result = await sut.load({
      name: fakeName
    })
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

  it('should return the correct document when all props are provided', async () => {
    const fakeName = faker.name.fullName()
    const fakeStateProvince = faker.address.state()
    const fakeCountry = faker.address.country()
    const documentId = new mongoose.Types.ObjectId().toHexString()
    const fakeUniversity = {
      _id: documentId,
      name: fakeName,
      country: fakeCountry,
      stateProvince: fakeStateProvince,
      domains: [faker.internet.domainName()],
      webPages: [faker.internet.url()],
      alphaTwoCode: faker.address.countryCode()
    }
    await UniversityModel.create(fakeUniversity)
    const sut = new MongoLoadUniversityByProps()
    const result = await sut.load({
      name: fakeName,
      stateProvince: fakeStateProvince,
      country: fakeCountry
    })
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

  it('should return null if university was not found', async () => {
    const fakeName = faker.name.fullName()
    const fakeStateProvince = faker.address.state()
    const fakeCountry = faker.address.country()
    const sut = new MongoLoadUniversityByProps()
    const result = await sut.load({
      name: fakeName,
      stateProvince: fakeStateProvince,
      country: fakeCountry
    })
    expect(result).toBeNull()
  })
})
