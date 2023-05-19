import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {jwtSecret} from '../utils/constants';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService, private jwt : JwtService) {}

    // signup function
    async signup(dto:AuthDto) {
        const {email, password} = dto;

        const foundUser = await this.prisma.user.findUnique({where: {email}})

        if (foundUser) {
            throw new BadRequestException('email already exists')
        }


        const hashedPassword = await this.hashPassword(password)

        await this.prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });

        return {message: 'signup was success'}
    }


// signin function
async signin(dto: AuthDto): Promise<string> {
    const { email, password } = dto;
  
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
  
    if (!foundUser) {
      throw new BadRequestException('invalid credentials');
    }
  
    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.hashedPassword,
    });
  
    if (!isMatch) {
      throw new BadRequestException('invalid credentials');
    }
  
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    });
  
    if (!token) {
      throw new ForbiddenException();
    }
  
    return token;
  }

// signout function
    async signout(req: Request, res: Response) {
        res.clearCookie('token')        
        return res.send({message: 'Log out succesfully'});
    }

// password convert in hashedpassword
    async hashPassword(password:string) {
        const saltOrRounds = 10;

       return await bcrypt.hash(password, saltOrRounds); 
    }

    // password comperison 

    async comparePassword(args: {password:string, hash:string}) {
        return await bcrypt.compare(args.password, args.hash)
    }

    // sigin token 

    async signToken(args: {id:string, email:string}) {
        const payload = args

       return this.jwt.signAsync(payload, {secret: jwtSecret})
    }
}
