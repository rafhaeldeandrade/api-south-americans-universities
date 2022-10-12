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
    const documents = await this.model.countDocuments(props)
    return documents
  }
}
