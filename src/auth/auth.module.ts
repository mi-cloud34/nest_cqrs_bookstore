import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ResetToken } from './entity/reset-token.entity';
import { MailService } from 'src/common/insfractructure/services/mailService';

@Module({
  imports: [
  
    TypeOrmModule.forFeature([User, ResetToken]),
  ],
  controllers: [AuthController],
  providers: [AuthService,MailService],
  exports: [AuthService],
})
export class AuthModule {}