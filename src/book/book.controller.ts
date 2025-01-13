import { Body, Controller, Delete, Get, Logger, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/common/insfractructure/guards/authentication.guard';
import { Message } from 'src/common/insfractructure/decorators/message.decorators';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBookDto } from './application/dtos/create_book.dto';
import { CreateBookCommand } from './application/commons/create_book/create_book.command';
import { AuthorizationGuard } from 'src/common/insfractructure/guards/authorization.guard';
import { GetBookByIdQuery } from './application/queries/get_book_by_id/get_book_by_id.query';
import { GetBooksQuery } from './application/queries/get_books/get_book.query';
import { BookIdDto } from './application/dtos/book_id.dto';
import { FindManyOptions } from 'typeorm';
import { RolesGuard } from 'src/common/insfractructure/guards/roles.quard';
import { Roles } from 'src/common/insfractructure/decorators/roles.decorator';
import { Rolles } from 'src/auth/enums/role.enum';
import { DeleteBookByIdCommand } from './application/commons/delete_book/delete_book.command';

@Controller('book')

@UseGuards(AuthenticationGuard)
export class BookController {
  private readonly logger = new Logger(BookController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  
  ) {}

  @Post()
   @Roles(Rolles.MANAGER,Rolles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @UseGuards(RolesGuard) 
  @Message('Product created successfully.')
  async createProduct (@Req() req,@Body() createBookDTO: CreateBookDto) {
    console.log("req",req);
    
      return this.commandBus.execute(new CreateBookCommand(createBookDTO))
  }
  @Get(':bookId') 
  @Message('Book fetched successfully.')
  async getBookById(@Param() params: BookIdDto,@Query('key') key:string) {
    this.logger.log(`params: ${JSON.stringify(params)}`);
    return this.queryBus.execute(new GetBookByIdQuery(params.id))
  }
  @Get()
  @Message('Book fetched successfully.') 
  async getBooks(@Query() query:FindManyOptions) {
    console.log("queryyy",query);
    
    return this.queryBus.execute(new GetBooksQuery(query))
  }
  @Roles(Rolles.MANAGER,Rolles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @Delete(':bookId')
  @Message('Book deleted successfully.')
  async deletProductById(@Param() params: BookIdDto) {


    const id:any=this.queryBus.execute(new GetBookByIdQuery(params.id))
    
  
    return this.commandBus.execute(new DeleteBookByIdCommand(id))
  }
}
 