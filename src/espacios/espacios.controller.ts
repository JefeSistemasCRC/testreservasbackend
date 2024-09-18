// src/espacios/espacios.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

import { EspaciosService } from './espacios.service';
import { Espacio } from './schemas/espacio.schema';
@ApiTags('espacios')
@Controller('espacios')
export class EspaciosController {
  constructor(private readonly espaciosService: EspaciosService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createEspacioDto: Partial<Espacio>): Promise<Espacio> {
    return this.espaciosService.create(createEspacioDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Espacio[]> {
    return this.espaciosService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string): Promise<Espacio> {
    return this.espaciosService.findById(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateEspacioDto: Partial<Espacio>): Promise<Espacio> {
    return this.espaciosService.update(id, updateEspacioDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.espaciosService.remove(id);
  }
}
