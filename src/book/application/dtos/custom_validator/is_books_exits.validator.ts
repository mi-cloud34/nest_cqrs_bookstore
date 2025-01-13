import { Injectable } from '@nestjs/common'
import { ValidationArguments, ValidatorConstraint } from 'class-validator'
import { AbstractBookRepository } from 'src/book/domain/repositories/book.repositories'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsBookExist {
  constructor(private readonly repository: AbstractBookRepository<Document>) {}

  // eslint-disable-next-line
  async validate(id: number, args: ValidationArguments) {
    return this.repository.findById(id)
  }

  // eslint-disable-next-line
  defaultMessage(args: ValidationArguments) {
    return 'book cannot found'
  }
}