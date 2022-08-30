import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.appService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    return this.appService.getById(+id);
  }

  @Post()
  createUser(@Body() newUser: UserDto): Promise<User> {
    console.log('user', newUser);
    return this.appService.createNewUser(newUser);
  }

  @Patch(':id')
  updateUser(@Body()  newUser: UserDto, @Param('id') id: string): Promise<User> {
    return this.appService.updateNewUser(+id, newUser);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.appService.deleteUser(+id);
  }
}
