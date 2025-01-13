import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './common/insfractructure/config/config';
import { BookStoreModule } from './book_store/book_store.module';
import { BookModule } from './book/book.module';
import { User } from './auth/entity/user.entity';
import { Book } from './book/entity/book.entity';
import { BookStore } from './book_store/entity/book_store.entity';
import { ResetToken } from './auth/entity/reset-token.entity';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        name: config.get('database.name'),
        autoLoadEntities: true, 
        //entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        //entities: [User,Role,Permission,Book,BookStore,RefreshToken,ResetToken],
        synchronize: true, 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    BookModule,
    BookStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
