import { useEffect, useState } from 'react'
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native'
import { router } from 'expo-router'
import { useCarros, useEliminarCarro } from '../hooks/useCarros'

export default function App() {
  //Lista de carros desde TanStack Query
  const { data: carros = [], isLoading, error } = useCarros()

  //Estado de carga y resultado de la mutacion de eliminar
  const {
    mutate: eliminarCarro,
    isPending: eliminando,
    isSuccess: eliminarExito,
    isError: eliminarError,
  } = useEliminarCarro()

  //Textos de los inputs, aceptan id o nombre
  const [idEliminar, setIdEliminar] = useState('')
  const [idEditar, setIdEditar] = useState('')

  //Muestra el resultado de eliminar
  useEffect(() => {
    if (eliminarExito) Alert.alert('Éxito', 'Carro eliminado')
    else if (eliminarError) Alert.alert('Error', 'No se pudo eliminar')
  }, [eliminarExito, eliminarError])

  //Busca el carro por id o por nombre y devuelve su id
  const buscarId = (valor: string): string | undefined => {
    const texto = valor.trim()
    const carro =
      carros.find(c => c.id === texto) ??
      carros.find(c => c.marca.toLowerCase() === texto.toLowerCase())
    return carro?.id
  }

  if (isLoading) return <Text> Cargando .... </Text>
  if (error) return <Text>Error: {error.message}</Text>

  //Pide confirmacion y elimina el carro encontrado
  const confirmarEliminar = () => {
    const id = buscarId(idEliminar)
    if (!id) {
      Alert.alert('Error', 'Carro no encontrado')
      return
    }

    Alert.alert(
      'Confirmar eliminación',
      `¿Deseas eliminar el carro con ID ${id}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () =>
            eliminarCarro(id, { onSuccess: () => setIdEliminar('') }),
        },
      ],
    )
  }

  //Abre el formulario de edicion con el carro encontrado
  const abrirEdicion = () => {
    const id = buscarId(idEditar)
    if (!id) {
      Alert.alert('Error', 'Carro no encontrado')
      return
    }
    router.push({ pathname: '/editar', params: { id } })
  }

  return (
    <View style={{ flex: 1, paddingTop: 60, backgroundColor: '#fff' }}>
      <Button
        title="Agregar carro"
        onPress={() => router.push('/agregar')}
      />

      <TextInput
        value={idEliminar}
        onChangeText={setIdEliminar}
        placeholder="ID o nombre del carro a eliminar"
      />

      <Button
        title={eliminando ? 'Eliminando...' : 'Eliminar carro'}
        color="red"
        disabled={eliminando}
        onPress={confirmarEliminar}
      />

      <TextInput
        value={idEditar}
        onChangeText={setIdEditar}
        placeholder="ID o nombre del carro a editar"
      />

      <Button title="Editar carro" onPress={abrirEdicion} />

      <FlatList
        data={carros}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text>
              {item.id} - {item.marca}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
