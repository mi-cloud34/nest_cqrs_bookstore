import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, FindOneOptions, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export abstract class AbstractBaseRepository<Entity> {
  abstract create(object: DeepPartial<Entity>): Promise<Entity>;

  abstract find(query: FindManyOptions<Entity>): Promise<Entity[]>;

  abstract findById(id: number): Promise<Entity | null>;
  abstract findByIds(ids: number[]): Promise<Entity[]>;
  abstract findByIdAndDelete(id: number): Promise<DeleteResult>;

  abstract findByIdAndUpdate(id: number, object: DeepPartial<Entity>): Promise<Entity>;

  abstract findOne(query: FindOneOptions<Entity>): Promise<Entity | null>;

  abstract findOneAndDelete(query: FindOneOptions<Entity>): Promise<DeleteResult>;


  abstract findOneAndUpdate(query: FindOneOptions<Entity>, object: DeepPartial<Entity>): Promise<UpdateResult>;

  abstract updateMany(query: FindManyOptions<Entity>, object: DeepPartial<Entity>): Promise<UpdateResult>;

  abstract updateOne(query: FindOneOptions<Entity>, object: DeepPartial<Entity>): Promise<UpdateResult>;

  abstract deleteMany(query: FindManyOptions<Entity>): Promise<DeleteResult>;

  abstract deleteOne(query: FindOneOptions<Entity>): Promise<DeleteResult>;
}
