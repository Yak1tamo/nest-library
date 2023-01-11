import {
  UseGuards,
  Request,
  Body,
  Controller,
  Post,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { AuthService } from './auth.service';
import { UserSignup } from '../users/dto/user-signup';
import { UserSignin } from '../users/dto/user-signin';

@Controller('api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserSignup) {
    return await this.authService.createUser(user);
  }

  @Post('signin')
  async signin(@Body() user: UserSignin) {
    return await this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login')
  async login(@Request() req) {
    return req.user;
  }
}
