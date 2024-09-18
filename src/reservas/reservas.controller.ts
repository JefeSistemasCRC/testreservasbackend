import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard'; // Importa el guard de autenticación

import { ReservasService } from './reservas.service';
import { Reserva } from './schemas/reserva.schema';
@ApiTags('reservas')
@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createReservaDto: Partial<Reserva>, @Request() req): Promise<Reserva> {
    console.log('Usuario autenticado:', req.user); // Accede a los datos del usuario autenticado desde el token

    return this.reservasService.create(createReservaDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Reserva[]> {
    return this.reservasService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string): Promise<Reserva> {
    return this.reservasService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: Partial<Reserva>): Promise<Reserva> {
    return this.reservasService.update(id, updateReservaDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.reservasService.remove(id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('user/:iduser')
  findByUser(@Param('iduser') iduser: string): Promise<Reserva[]> {
    return this.reservasService.findByUser(iduser);
  }
}
