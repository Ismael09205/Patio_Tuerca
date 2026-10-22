//Define la navegacion de tipo stack desde expo router
//Importams QueryClient y QueryClientProcider desde tanstack
//Estos se usan para configurar y proveer el cliente de quieres en toda la app 

import{Tabs} from 'expo-router'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

//Creamos una isntancia QueyClient
//Este objeto administra la cache y el cliclo de vida de las quetys/mutations

const qc=new QueryClient()

//Componente layout, para encolver la navegacion dentro de QueryClientProvider
//Con esto, todos los componentes hijos pueden usar useQuery y useMutation 

//Este es el pnto de integracion contra TanStack Quey y la navegacion de Expo


export default function Layout(){
return(
  <QueryClientProvider client ={qc}>
    <Tabs>
      <Tabs.Screen name ="index" options={{title:'Home'}}/>
      <Tabs.Screen name ="explore" options={{title:'Explore'}}/>
      <Tabs.Screen name ="editar" options={{href: null, title:'Editar'}}/>
      <Tabs.Screen name ="agregar" options={{href: null, title:'Agregar'}}/>
    </Tabs>


  </QueryClientProvider>
  
  
  
  


)

}