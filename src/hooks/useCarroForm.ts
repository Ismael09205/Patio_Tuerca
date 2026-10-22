import { useForm } from '@tanstack/react-form'
import { Carro } from '../types/carro'
import { CarroForm, aCarro } from '../utils/carro-form'

//Formulario compartido de agregar y editar
//onValido recibe el carro convertido cuando todos los campos son validos
export function useCarroForm(
  valores: CarroForm,
  onValido: (carro: Omit<Carro, 'id'>) => void,
) {
  return useForm({
    defaultValues: valores,
    onSubmit: ({ value }) => onValido(aCarro(value)),
  })
}

//Tipo del formulario para pasarlo a los campos
export type CarroFormApi = ReturnType<typeof useCarroForm>
