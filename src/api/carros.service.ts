import { client } from './client'
import { Carro } from '../types/carro'

//definiir un servicio llamado carrosService
//El servicio centraliza las operaciondes de la entidad carro
//retorna una promesa con un arreglo de objeto

//La API mock devuelve anio y precio como texto, aqui se normalizan
function normalizarCrudo(c: Partial<Carro>): Carro {
  return {
    id: c.id ?? '',
    marca: c.marca ?? '',
    modelo: c.modelo ?? '',
    color: c.color ?? '',
    anio: Number(c.anio) || 0,
    kilometraje: String(c.kilometraje ?? ''),
    precio: Number(c.precio) || 0,
  }
}

export const carrosService = {
  //Metodo get
  getAll: async (): Promise<Carro[]> => {
    const { data } = await client.get<Partial<Carro>[]>('patio')
    return data.map(normalizarCrudo)
  },

  //Metodo POST: agrega un carro completo y retorna el objeto creado
  add: async (nuevo: Omit<Carro, 'id'>): Promise<Carro> => {
    const { data } = await client.post<Carro>('patio', nuevo)
    return data
  },
  //Metodo Delete 
  delete: async (id:string): Promise<void> =>{
  await client.delete(`patio/${id}`)

  },

  //Metodo PUT: actualiza un carro existente por id
  update: async (id: string, datos: Partial<Carro>): Promise<Carro> => {
    const { data } = await client.put<Carro>(`patio/${id}`, datos)
    return data
  }

}
