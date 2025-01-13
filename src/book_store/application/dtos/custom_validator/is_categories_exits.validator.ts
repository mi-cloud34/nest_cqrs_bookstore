import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractBookStoreRepository } from 'src/book_store/domain/repositories/book_store.repositories'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookStoreExist {
  constructor(private readonly repository: AbstractBookStoreRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: number, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'bookStore cannot found'
  }
}