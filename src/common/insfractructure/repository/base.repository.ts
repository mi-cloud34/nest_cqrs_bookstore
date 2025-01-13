import { Injectable } from '@nestjs/common';
import { Repository, DeepPartial, FindManyOptions, FindOneOptions, UpdateResult, DeleteResult, FindOptionsWhere, Entity, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractBaseRepository } from '../../domain/repository/base.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class BaseRepository<Entity> extends AbstractBaseRepository<Entity> {
  

  constructor(
    @InjectRepository(Entity) private readonly repository: Repository<Entity>,
  ) {
    super();
  }

  create(object: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(object);
    return this.repository.save(entity);
  }

  find(query: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(query);
  }

  findById(id: number): Promise<Entity> {
    return this.repository.findOneBy({ id } as unknown as FindOptionsWhere<Entity>);
  }
  findByIds(ids: number[]): Promise<Entity[]> {
    return this.find({
      where: {
        id: In(ids),
      } as unknown as FindOptionsWhere<Partial<Entity>>
    });
  }
  findByIdAndDelete(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  findByIdAndUpdate(id: number, object: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save({ ...object, id });
  }

  findOne(query: FindOneOptions<Entity>): Promise<Entity> {
    return this.repository.findOne(query);
  }

  findOneAndDelete(query: FindOneOptions<Entity>): Promise<DeleteResult> {
    if (!query.where) {
      throw new Error('Where clause is required for findOneAndDelete');
    }
    return this.repository.delete(query.where as FindOptionsWhere<Entity>);
  }
  findOneAndUpdate(query: FindOneOptions<Entity>, object: DeepPartial<Entity>): Promise<UpdateResult> {
    if (!query.where) {
      throw new Error('Where clause is required for findOneAndUpdate');
    }
    return this.repository.update(query.where as FindOptionsWhere<Entity>, object as QueryDeepPartialEntity<Entity>);
  }
  updateMany(
    query: FindManyOptions<Entity>,
    object: DeepPartial<Entity>,
  ): Promise<UpdateResult> {
    if (!query.where) {
      throw new Error('Where clause is required for updateMany');
    }
    return this.repository.update(
      query.where as FindOptionsWhere<Entity>,
      object as QueryDeepPartialEntity<Entity>,
    );
  }
  
  updateOne(
    query: FindOneOptions<Entity>,
    object: DeepPartial<Entity>,
  ): Promise<UpdateResult> {
    if (!query.where) {
      throw new Error('Where clause is required for updateOne');
    }
    return this.repository.update(
      query.where as FindOptionsWhere<Entity>,
      object as QueryDeepPartialEntity<Entity>,
    );
  }
  
  deleteMany(query: FindManyOptions<Entity>): Promise<DeleteResult> {
    if (!query.where) {
      throw new Error('Where clause is required for deleteMany');
    }
    return this.repository.delete(query.where as FindOptionsWhere<Entity>);
  }

  deleteOne(query: FindOneOptions<Entity>): Promise<DeleteResult> {
    if (!query.where) {
      throw new Error('Where clause is required for deleteOne');
    }
    return this.repository.delete(query.where as FindOptionsWhere<Entity>);
  }
}