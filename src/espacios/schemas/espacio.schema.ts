// src/espacios/schemas/espacio.schema.ts
import { Schema, Document } from 'mongoose';

export const EspacioSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  capacidad: { type: Number, required: true },
  estado: { type: String, enum: ['disponible', 'ocupado'], default: 'disponible' },
});

export interface Espacio extends Document {
  nombre: string;
  descripcion: string;
  capacidad: number;
  estado: string;
}
