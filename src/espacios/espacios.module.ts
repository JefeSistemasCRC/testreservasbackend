// src/espacios/espacios.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EspaciosService } from './espacios.service';
import { EspaciosController } from './espacios.controller';
import { EspacioSchema } from './schemas/espacio.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Espacio', schema: EspacioSchema }])],
  controllers: [EspaciosController],
  providers: [EspaciosService],
})
export class EspaciosModule {}
