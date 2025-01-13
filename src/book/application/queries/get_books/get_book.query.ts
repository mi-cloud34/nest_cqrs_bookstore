import { FindManyOptions } from "typeorm";

export class GetBooksQuery {constructor(public readonly query: FindManyOptions) {}} 