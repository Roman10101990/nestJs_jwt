import { Body, Controller, Post } from '@nestjs/common';
import { User } from './../entity/user.entity';
import { UserDto } from './../dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('registration')
  registrationUser(@Body() credentials: UserDto ): Promise<User> {
    return this.authService.registration(credentials);
  }

  @Post('login')
  loginUser(@Body() credentials: UserDto): Promise<any> {
    return this.authService.login(credentials);
  }
}
