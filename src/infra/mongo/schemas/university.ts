import mongoose from 'mongoose'

const universitySchema = new mongoose.Schema({
  stateProvince: { type: String, required: false, default: null },
  alphaTwoCode: { type: String, required: true },
  webPages: { type: [String], required: true },
  country: { type: String, required: true },
  name: { type: String, required: true },
  domains: { type: [String], required: true }
})

export const UniversityModel = mongoose.model('University', universitySchema)