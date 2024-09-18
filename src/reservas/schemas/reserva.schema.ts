import { Schema, Document } from 'mongoose';

export const ReservaSchema = new Schema({
  idespacio: { type: String, required: true },
  iduser: { type: String, required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, enum: ['reservado', 'cancelado'], default: 'reservado' },
  duracion: { type: Number, required: true }, // Duración agregada como número entero
});

export interface Reserva extends Document {
  id: string;
  idespacio: string;
  iduser: string;
  fecha: Date;
  estado: string;
  duracion: number; // Duración como número entero
}
