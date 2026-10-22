import { StyleSheet, Text, TextInput, View } from 'react-native'
import { CarroFormApi } from '../hooks/useCarroForm'
import { ANIO_MAX, ANIO_MIN, PRECIO_MAX } from '../utils/carro-form'

//Muestra el mensaje de error debajo del campo
function ErrorCampo({ texto }: { texto?: string }) {
  if (!texto) return null
  return <Text style={estilos.error}>{texto}</Text>
}

//Los 6 campos del carro, cada uno con su validacion y su error visible
export function CarroFormFields({ form }: { form: CarroFormApi }) {
  return (
    <>
      <form.Field
        name="marca"
        validators={{
          onChange: ({ value }) =>
            value.trim() ? undefined : 'La marca es obligatoria',
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Marca *"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>

      <form.Field
        name="modelo"
        validators={{
          onChange: ({ value }) =>
            value.trim() ? undefined : 'El modelo es obligatorio',
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Modelo *"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>

      <form.Field
        name="anio"
        validators={{
          onChange: ({ value }) => {
            if (!value.trim()) return 'El año es obligatorio'
            const anio = Number(value)
            if (!Number.isInteger(anio)) return 'El año debe ser un número entero'
            if (anio < ANIO_MIN || anio > ANIO_MAX)
              return `El año debe estar entre ${ANIO_MIN} y ${ANIO_MAX}`
            return undefined
          },
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Año (ej. 2020) *"
              keyboardType="number-pad"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>

      <form.Field
        name="color"
        validators={{
          onChange: ({ value }) =>
            value.trim() ? undefined : 'El color es obligatorio',
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Color *"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>

      <form.Field
        name="kilometraje"
        validators={{
          onChange: ({ value }) => {
            if (!value.trim()) return 'El kilometraje es obligatorio'
            const km = Number(value)
            if (Number.isNaN(km) || km < 0)
              return 'El kilometraje debe ser un número igual o mayor a 0'
            return undefined
          },
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Kilometraje *"
              keyboardType="number-pad"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>

      <form.Field
        name="precio"
        validators={{
          onChange: ({ value }) => {
            if (!value.trim()) return 'El precio es obligatorio'
            const precio = Number(value)
            if (Number.isNaN(precio) || precio <= 0)
              return 'El precio debe ser un número mayor a 0'
            if (precio > PRECIO_MAX)
              return `El precio no puede superar ${PRECIO_MAX}`
            return undefined
          },
        }}
      >
        {campo => (
          <View style={estilos.campo}>
            <TextInput
              value={campo.state.value}
              onChangeText={campo.handleChange}
              placeholder="Precio *"
              keyboardType="decimal-pad"
            />
            <ErrorCampo texto={campo.state.meta.errors[0]} />
          </View>
        )}
      </form.Field>
    </>
  )
}

const estilos = StyleSheet.create({
  campo: { marginBottom: 4 },
  error: { color: '#c0392b', fontSize: 12, marginTop: 4 },
})
