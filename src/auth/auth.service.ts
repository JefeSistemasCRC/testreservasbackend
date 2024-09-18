import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class AuthService {
  global: true;
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Valida las credenciales del usuario
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findByEmail(email);

      //console.log("contraseña base datos:", user.password);

      if (user && (await bcrypt.compare(password, user.password))) {
        // La contraseña en texto plano coincide con la encriptada
        const { password, ...result } = user.toObject(); // Convierte el documento de Mongoose en un objeto normal

        return result as User;
      }

      return null; // Si la comparación falla, retorna null
    } catch (error) {
      console.error('Error validating user:', error);
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  // Maneja el inicio de sesión del usuario
  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Crea el payload del token
    const payload = { email: user.email, rol: user.rol, sub: user._id.toString() };

    // console.log(user);
    // Retorna el token JWT firmado
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
