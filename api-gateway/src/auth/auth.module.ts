import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
import { ProxyModule } from 'src/common/proxy/proxy.module';
dotenv.config();

@Module({
  imports:[ConfigModule.forRoot({
    envFilePath: ['.env.development'],
    isGlobal: true,
  }),
  UserModule, 
  PassportModule, 
  ProxyModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.EXPIRES_IN,
      audience: process.env.APP_URL
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
