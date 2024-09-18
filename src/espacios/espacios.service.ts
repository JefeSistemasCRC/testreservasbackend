// src/espacios/espacios.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Espacio } from './schemas/espacio.schema';

@Injectable()
export class EspaciosService {
  constructor(@InjectModel('Espacio') private readonly espacioModel: Model<Espacio>) {}

  async create(createEspacioDto: Partial<Espacio>): Promise<Espacio> {
    const nuevoEspacio = new this.espacioModel(createEspacioDto);

    return nuevoEspacio.save();
  }

  async findAll(): Promise<Espacio[]> {
    return this.espacioModel.find().exec();
  }

  async findById(id: string): Promise<Espacio> {
    const espacio = await this.espacioModel.findById(id).exec();

    if (!espacio) {
      throw new NotFoundException('Espacio no encontrado');
    }

    return espacio;
  }

  async update(id: string, updateEspacioDto: Partial<Espacio>): Promise<Espacio> {
    const espacioActualizado = await this.espacioModel
      .findByIdAndUpdate(id, updateEspacioDto, { new: true })
      .exec();

    if (!espacioActualizado) {
      throw new NotFoundException('Espacio no encontrado');
    }

    return espacioActualizado;
  }

  async remove(id: string): Promise<void> {
    const espacioEliminado = await this.espacioModel.findByIdAndDelete(id).exec();

    if (!espacioEliminado) {
      throw new NotFoundException('Espacio no encontrado');
    }
  }
}
