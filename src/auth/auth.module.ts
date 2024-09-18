import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import passport from 'passport';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module'; // Asegúrate de que esta ruta es correcta
import { JwtStrategy } from '../auth/jwt/jwt.strategy';

import { AuthController } from './auth.controller'; // Asegúrate de importar AuthController
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', // Asegúrate de que `JWT_SECRET` está configurado
      signOptions: { expiresIn: '60m' },
    }),
    UserModule, // Importa el módulo que contiene UserService
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController], // Asegúrate de que AuthController está registrado aquí
})
export class AuthModule {}
