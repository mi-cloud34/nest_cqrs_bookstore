import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { ResetToken } from './entity/reset-token.entity';
import { MailService } from 'src/common/insfractructure/services/mailService';
import { Roles } from 'src/common/insfractructure/decorators/roles.decorator';
import { Rolles } from './enums/role.enum';
import { RolesGuard } from 'src/common/insfractructure/guards/roles.quard';
import { AuthorizationGuard } from 'src/common/insfractructure/guards/authorization.guard';
import { AuthenticationGuard } from 'src/common/insfractructure/guards/authentication.guard';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
   
    @InjectRepository(ResetToken)
    private resetTokenRepository: Repository<ResetToken>,
    private jwtService: JwtService,
    private mailService: MailService,
   
  ) {}

  async signup(signupData: SignupDto) {
    const { email, password, name,role } = signupData;
   
    // Check if email is in use
    const emailInUse = await this.userRepository.findOne({ where: { email } });
    console.log("emailInUse",emailInUse);
   
    if (emailInUse) {
      throw new BadRequestException('Email already in use');
    }
    
 
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user entity and save in PostgreSQL
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await this.userRepository.save(user);
    return { message: 'User registered successfully' };
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Find if user exists by email
    const user = await this.userRepository.findOne({ where: { email }, });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Compare entered password with existing password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Generate JWT tokens
   // const tokens = await this.generateUserTokens(user.id);
    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role, // Burada role'ü ekliyoruz
    };
  
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      ...user
    };
  }
  async generateUserTokens(userId: number) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '10h' });
    const refreshToken = uuidv4();


    return {
      accessToken,
      refreshToken,
    };
  }

  async updateUserRole(userId: number, newRole: Rolles): Promise<{ message: string }> {
    // Kullanıcıyı kontrol et
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  
    // Yeni rolü doğrula
    if (!Object.values(Rolles).includes(newRole)) {
      throw new BadRequestException(`Invalid role: ${newRole}`);
    }
   if (user.role === Rolles.ADMIN) {
      throw new BadRequestException(`Administrator role cannot be updated with ${newRole}`);
    
   }
    // Rolü güncelle
    user.role = newRole;
    await this.userRepository.save(user);
  
    return { message: `Role updated successfully to ${newRole}` };
  }
  async changePassword(userId: number, oldPassword: string, newPassword: string) {
    // Find the user
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    // Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong credentials');
    }

    // Change user's password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    await this.userRepository.save(user);
  }

  async forgotPassword(email: string) {
    // Check that user exists
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      // If user exists, generate password reset link
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);
      const resetTokenEntity = this.resetTokenRepository.create({
        token: resetToken,
        user: user,
        expiryDate,
      });
      await this.resetTokenRepository.save(resetTokenEntity);
      this.mailService.sendPasswordResetEmail(email, resetToken);
      // Send the link to the user by email
    }

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(newPassword: string, resetToken: string) {
    // Find a valid reset token entity
    const token = await this.resetTokenRepository.findOne({
      where: {
        token: resetToken,
        expiryDate: MoreThanOrEqual(new Date()),
      },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    // Change user password (MAKE SURE TO HASH!!)
    const user = await this.userRepository.findOne({where: {id: token.user.id}});
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
  }



 

  async getUserPermissions(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) throw new BadRequestException();

    
  }
}