import { useEffect } from 'react'
import { Alert, Button, ScrollView, Text } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Carro } from '../types/carro'
import { useCarros, useEditarCarro } from '../hooks/useCarros'
import { useCarroForm } from '../hooks/useCarroForm'
import { CarroFormFields } from '../components/carro-form-fields'
import { aFormulario } from '../utils/carro-form'

//Busca el carro en la cache y abre su formulario de edicion
export default function Editar() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { data: carros = [], isLoading } = useCarros()
  const carro = carros.find(c => c.id === id)

  if (isLoading) return <Text>Cargando ....</Text>
  if (!carro) return <Text>Carro no encontrado</Text>

  return <Formulario id={String(id)} carro={carro} />
}

//Formulario precargado con los datos actuales del carro
function Formulario({ id, carro }: { id: string; carro: Carro }) {
  const {
    mutate: editarCarro,
    isPending: guardando,
    isSuccess: guardarExito,
    isError: guardarError,
  } = useEditarCarro()

  //Precarga los campos y solo guarda si todo es valido
  const form = useCarroForm(aFormulario(carro), datos =>
    editarCarro({ id, datos }),
  )

  //Muestra el resultado de guardar y vuelve a la lista
  useEffect(() => {
    if (guardarExito) {
      Alert.alert('Éxito', 'Carro actualizado')
      router.back()
    } else if (guardarError) {
      Alert.alert('Error', 'No se pudo actualizar')
    }
  }, [guardarExito, guardarError])

  return (
    <ScrollView
      style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}
      contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 4 }}>
        Editar carro
      </Text>
      <Text style={{ marginBottom: 16 }}>ID: {carro.id}</Text>

      <CarroFormFields form={form} />

      <Button
        title={guardando ? 'Guardando...' : 'Guardar cambios'}
        disabled={guardando}
        onPress={() => form.handleSubmit()}
      />
      <Button title="Cancelar" onPress={() => router.back()} />
    </ScrollView>
  )
}
