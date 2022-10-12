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
    const filter = {} as any
    if (props.country) filter.country = props.country
    const documents = await this.model.countDocuments(filter)
    return documents
  }
}
