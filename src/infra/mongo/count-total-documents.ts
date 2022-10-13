import {
  CountTotalDocumentsRepository,
  CountTotalDocumentsRepositoryInput,
  CountTotalDocumentsRepositoryOutput
} from '@/data/contracts'

export class MongoCountTotalDocuments implements CountTotalDocumentsRepository {
  constructor(private readonly model: any) {}

  async count(
    props: CountTotalDocumentsRepositoryInput
  ): Promise<CountTotalDocumentsRepositoryOutput> {
    const { country } = props
    const filter = {} as any
    if (country) filter.country = { $regex: new RegExp(country, 'i') }
    const documents = await this.model.countDocuments(filter)
    return documents
  }
}
