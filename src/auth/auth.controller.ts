import { UseGuards, Body, Controller, Post } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.auth.guard';
import { AuthService } from './auth.service';
import { UserSignup } from '../users/dto/user-signup';
import { UserSignin } from '../users/dto/user-signin';

@Controller('api/users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: UserSignup) {
    const added = await this.authService.addUser(user);
    if (added) {
      this.authService.login(added);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('signin')
  async signin(@Body() user: UserSignin) {
    return this.authService.login(user);
  }
}
