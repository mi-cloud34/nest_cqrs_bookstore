
import { Injectable } from '@nestjs/common'
import { AbstractBaseRepository } from 'src/common/domain/repository/base.repository';

@Injectable()
export abstract class AbstractBookRepository<
  Document
> extends AbstractBaseRepository<Document> {}