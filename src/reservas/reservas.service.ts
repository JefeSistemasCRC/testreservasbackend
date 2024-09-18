// src/reservas/reservas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Reserva } from './schemas/reserva.schema';

@Injectable()
export class ReservasService {
  constructor(@InjectModel('Reserva') private readonly reservaModel: Model<Reserva>) {}

  async create(createReservaDto: Partial<Reserva>): Promise<Reserva> {
    const newReserva = new this.reservaModel(createReservaDto);

    return newReserva.save();
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.find().exec();
  }

  async findById(id: string): Promise<Reserva> {
    const reserva = await this.reservaModel.findById(id).exec();

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reserva;
  }

  async update(id: string, updateReservaDto: Partial<Reserva>): Promise<Reserva> {
    const reserva = await this.reservaModel
      .findByIdAndUpdate(id, updateReservaDto, { new: true })
      .exec();

    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }

    return reserva;
  }

  async remove(id: string): Promise<void> {
    const result = await this.reservaModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Reserva no encontrada');
    }
  }

  async findByUser(iduser: string): Promise<Reserva[]> {
    return this.reservaModel.find({ iduser }).exec();
  }
}
