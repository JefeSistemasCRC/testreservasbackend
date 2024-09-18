// src/reservas/reservas.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ReservasService } from './reservas.service';
import { ReservasController } from './reservas.controller';
import { ReservaSchema } from './schemas/reserva.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Reserva', schema: ReservaSchema }])],
  providers: [ReservasService],
  controllers: [ReservasController],
})
export class ReservasModule {}
