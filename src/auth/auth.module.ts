import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../jwt.strategy';


@Module({
  imports: [PassportModule,
  JwtModule.register({
    secret: 'yourSecretKey', // Replace with your own secret key
    signOptions: { expiresIn: '1h' }, // Token expiration time
  })],
  providers: [JwtStrategy],
})
export class AuthModule { }
