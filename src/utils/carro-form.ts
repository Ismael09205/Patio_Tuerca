import { Carro } from '../types/carro'

//Limites de validacion del formulario
export const ANIO_MIN = 1900
export const ANIO_MAX = new Date().getFullYear() + 1
export const PRECIO_MAX = 1_000_000

//El formulario guarda todo como texto porque TextInput trabaja con strings
export interface CarroForm {
  marca: string
  modelo: string
  anio: string
  color: string
  kilometraje: string
  precio: string
}

export const formularioVacio: CarroForm = {
  marca: '',
  modelo: '',
  anio: '',
  color: '',
  kilometraje: '',
  precio: '',
}

//Convierte un carro de la API en valores del formulario
export function aFormulario(carro: Carro): CarroForm {
  return {
    marca: carro.marca ?? '',
    modelo: carro.modelo ?? '',
    anio: carro.anio ? String(carro.anio) : '',
    color: carro.color ?? '',
    kilometraje: String(carro.kilometraje ?? ''),
    precio: carro.precio ? String(carro.precio) : '',
  }
}

//Convierte los valores del formulario en un carro para la API
export function aCarro(valores: CarroForm): Omit<Carro, 'id'> {
  return {
    marca: valores.marca.trim(),
    modelo: valores.modelo.trim(),
    anio: Number(valores.anio),
    color: valores.color.trim(),
    kilometraje: valores.kilometraje.trim(),
    precio: Number(valores.precio),
  }
}
