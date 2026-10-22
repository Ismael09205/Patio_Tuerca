import { useEffect } from 'react'
import { Alert, Button, ScrollView, Text } from 'react-native'
import { router } from 'expo-router'
import { useAgregarCarro } from '../hooks/useCarros'
import { useCarroForm } from '../hooks/useCarroForm'
import { CarroFormFields } from '../components/carro-form-fields'
import { formularioVacio } from '../utils/carro-form'

//Pantalla para agregar un carro con formulario validado
export default function Agregar() {
  const {
    mutate: agregarCarro,
    isPending: agregando,
    isSuccess: agregarExito,
    isError: agregarError,
  } = useAgregarCarro()

  //El formulario solo llama al guardar cuando todos los campos son validos
  const form = useCarroForm(formularioVacio, nuevo => agregarCarro(nuevo))

  //Muestra el resultado del guardado y vuelve a la lista
  useEffect(() => {
    if (agregarExito) {
      Alert.alert('Éxito', 'Carro agregado')
      router.back()
    } else if (agregarError) {
      Alert.alert('Error', 'No se pudo agregar el carro')
    }
  }, [agregarExito, agregarError])

  return (
    <ScrollView
      style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}
      contentContainerStyle={{ padding: 16, paddingBottom: 48 }}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Agregar carro
      </Text>

      <CarroFormFields form={form} />

      <Button
        title={agregando ? 'Guardando...' : 'Guardar carro'}
        disabled={agregando}
        onPress={() => form.handleSubmit()}
      />
      <Button title="Cancelar" onPress={() => router.back()} />
    </ScrollView>
  )
}
