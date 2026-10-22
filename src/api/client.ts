import axios from 'axios'
//Crear un cliente de axios configurado con:
//baseURL: La url de la API, tomada de variables de entorno de EXPO
//headers: indicar que el contenido es JSON

export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: { 'Content-Type': 'application/json' }
})