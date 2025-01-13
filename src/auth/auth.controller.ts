import { Body, Controller, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthenticationGuard } from 'src/common/insfractructure/guards/authentication.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Roles } from 'src/common/insfractructure/decorators/roles.decorator';
import { Rolles } from './enums/role.enum';
import { RolesGuard } from 'src/common/insfractructure/guards/roles.quard';


@UseGuards(AuthenticationGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService
 

  ) {}
 @Roles(Rolles.ADMIN)
   @UseGuards(AuthenticationGuard)
   @UseGuards(RolesGuard)
  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Roles(Rolles.ADMIN)
  @UseGuards(AuthenticationGuard)
  @UseGuards(RolesGuard)
  @Patch('/role/:id')
  @Roles(Rolles.ADMIN) // Sadece admin izin verebilir
  @UseGuards(AuthenticationGuard, RolesGuard)
  async updateRole(
    @Param('id') id: number,
    @Body('newRole') newRole: Rolles,
  ) {
    return this.authService.updateUserRole(id, newRole);
  }
  

  @UseGuards(AuthenticationGuard)
  @Put('change-password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req,
    
    
  ) {
    console.log("req.userrr", req.userId);
    return this.authService.changePassword(
      req.userId,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
}
