import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtTokenService: JwtService){}

    async registration(credentials: UserDto): Promise<any> {
        const user = await this.usersRepository.findOne({where: {email: credentials.email}});

        if(user) {
            throw new HttpException('user exist', HttpStatus.BAD_REQUEST);
        }

       const hashPassword = await bcrypt.hash(credentials.password, 7);
       const newUser = await this.usersRepository.save({...credentials, password: hashPassword });
       
       return this.generateToken(newUser);
    }

    async generateToken(user: UserDto) {
       const payload = {email: user.email, id: user.phone};

       return {
        token: this.jwtTokenService.sign(payload) 
       }
    }

    async login(credentials: UserDto) {
        const user = await this.validateUser(credentials);

        return this.generateToken(user);
    }

    private async validateUser(credentials: UserDto) {
        const user = await this.usersRepository.findOne({where: {email: credentials.email}});

        const isPasswordEqual = await bcrypt.compare(credentials.password, user.password);

        if(user && isPasswordEqual) {
            return user;
        }

        throw new UnauthorizedException({message: 'no user'});
    }
}