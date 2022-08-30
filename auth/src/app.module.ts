import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
     TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: ,
    username: '',
    password: '',
    database: 'users',
    entities: [User],
    autoLoadEntities: true,
    synchronize: true,
  }), 
  TypeOrmModule.forFeature([User]),
  JwtModule.register({secret: 'myKey',
  signOptions: {expiresIn: '24h'}
}),
],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
