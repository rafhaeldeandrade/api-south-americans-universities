import axios from 'axios'

import env from '@/main/config/env'
import { University } from '@/domain/contracts'
import { UniversityModel } from '@/infra/mongo/schemas/university'
import { mongooseHelper } from '@/infra/mongo/helpers/mongoose-helper'

function mapToModel(universities: any[]): University[] {
  return universities.flatMap((university) => ({
    stateProvince: university['state-province'],
    alphaTwoCode: university['alpha_two_code'],
    webPages: university['web_pages'],
    country: university['country'],
    name: university['name'],
    domains: university['domains']
  }))
}

async function populateDatabase() {
  const countries = [
    'argentina',
    'brazil',
    'chile',
    'colombia',
    'paraguay',
    'peru',
    'suriname',
    'uruguay'
  ]
  const universities = await Promise.all(
    countries.map((country) => fetchUniversities(country))
  )
  const universitiesToSave = mapToModel(universities.flat())
  await UniversityModel.insertMany(universitiesToSave)
}

async function fetchUniversities(country: string): Promise<void> {
  const { data } = await axios.get(
    `http://universities.hipolabs.com/search?country=${country}`
  )
  return data
}

mongooseHelper
  .connect(`${env.mongoUrl}/universities`)
  .then(async () => {
    await UniversityModel.deleteMany({})
    await populateDatabase()
  })
  .finally(async () => await mongooseHelper.disconnect())
