import { Body, Controller, Delete, Get, Logger, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Message } from 'src/common/insfractructure/decorators/message.decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookStoreDto } from './application/dtos/create_book_store.dto';
import { CreateBookStoreCommand } from './application/commons/create_book_store/create_book_store.command';
import { GetBookStoreByIdQuery } from './application/queries/get_book_store_by_id/get_book_store_by_id.query';
import { GetBookStoresQuery } from './application/queries/get_book_stores/get_book_store.query';
import { BookStoreIdDto } from './application/dtos/book_store_id.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { GetBooksQueryIds } from 'src/book/application/queries/get_books_ids/get_book_ids.query';
import { Roles } from 'src/common/insfractructure/decorators/roles.decorator';
import { Rolles } from 'src/auth/enums/role.enum';
import { AuthenticationGuard } from 'src/common/insfractructure/guards/authentication.guard';
import { DeleteBookStoreByIdCommand } from './application/commons/delete_book_store/delete_book_store.command';
import { RolesGuard } from 'src/common/insfractructure/guards/roles.quard';
@UseGuards(AuthenticationGuard)
@Controller('bookStore')
export class BookStoreController {
   private readonly logger = new Logger(BookStoreController.name);
  
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}


  @Roles(Rolles.ADMIN)
   @UseGuards(AuthenticationGuard)
   @UseGuards(RolesGuard)
  @Post()
  
  //@UseGuards(AuthorizationGuard)
  @Message('BookStore  created successfully.')
  async createBookStore (@Req() req,@Body() createBookStoreDTO: CreateBookStoreDto) {
    const {books}=createBookStoreDTO 
    this.logger.log(`params: ${JSON.stringify(books)}`);
    this.logger.log(`store: ${JSON.stringify(createBookStoreDTO)}`);

     const bookEntities = await this.queryBus.execute(new GetBooksQueryIds(books));
     this.logger.log(`bookEntities: ${JSON.stringify(bookEntities)}`);
     const bookList = bookEntities.bookList;
     const bookIds = bookList.map((book: { id: number }) => book.id);

     this.logger.log(`Extracted book IDs: ${JSON.stringify(bookIds)}`);
    createBookStoreDTO.books=bookIds;
        await this.commandBus.execute(new CreateBookStoreCommand(createBookStoreDTO))
        createBookStoreDTO.books = bookEntities;
    return createBookStoreDTO
      
  }
  @Get(':bookStoreId')
  @Message('BookStore fetched successfully.')
  async getBookStoreById(@Param() params: BookStoreIdDto,@Query('key') key:string) {
    console.log("paramsssss",params);
  
    return this.queryBus.execute(new GetBookStoreByIdQuery(params.id))
  }
  @Get()
  @Message('BookStore fetched successfully.') 
  async getBookStores(@Query() query:FindManyOptions) {
    console.log("queryyy",query);
    
    return this.queryBus.execute(new GetBookStoresQuery(query))
  }
 
 
   @Roles(Rolles.ADMIN)
   @UseGuards(AuthenticationGuard)
   @UseGuards(RolesGuard)
   @Delete(':bookstoreId')
   @Message('Book deleted successfully.')
   async deletProductById(@Param() params: BookStoreIdDto) {
 
 
     const id:any=this.queryBus.execute(new GetBookStoreByIdQuery(params.id))
     return this.commandBus.execute(new DeleteBookStoreByIdCommand(id))
   }
}
 