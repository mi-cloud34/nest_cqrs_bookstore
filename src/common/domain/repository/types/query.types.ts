import { UpdateResult, DeleteResult } from 'typeorm';

export type QueryResults<Entity> = Promise<Entity[]>;

export type QueryResult<Entity> = Promise<Entity | null>;

export type UpdateWriteQueryResult<Entity> = Promise<UpdateResult>;

export type DeleteQueryResult<Entity> = Promise<DeleteResult>;