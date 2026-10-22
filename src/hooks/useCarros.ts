//Importamos los hooks de tanstack query
//UseQuery: para consultas get
//useMutation para operaciones POST/PUT/DELETE
//useQueryClient: para interactuar con la cache (invalidar, refrescar)
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'
import { carrosService } from '@/api/carros.service'
import { Carro } from '@/types/carro'

//Definir una constante key que servira como identificador unico
//para las queries relacionadas con carros

const KEY=['carros']


export function useEliminarCarro(){
    const queryClient=useQueryClient()
    return(
        useMutation({
            mutationFn:(id:string)=>carrosService.delete(id),
            //OPTIMISTA: se ejecuta antes de la peticion al servidor
            onMutate: async (id:string) => {
                //Cancela refetch pendientes para que no sobrescriban el cambio
                await queryClient.cancelQueries({queryKey: KEY})
                //Guarda la lista actual para poder revertirla si falla
                const previous = queryClient.getQueryData<Carro[]>(KEY)
                //Quita el carro de la lista de inmediato, sin esperar al servidor
                queryClient.setQueryData<Carro[]>(KEY, (old) =>
                    old?.filter((c) => c.id !== id)
                )
                return { previous }
            },
            //Si la peticion falla, restaura la lista anterior (el carro reaparece)
            onError: (_error, _id, context) => {
                if (context?.previous) {
                    queryClient.setQueryData(KEY, context.previous)
                }
            },
            //Al terminar (exito o error) sincroniza con el servidor
            onSettled: () => queryClient.invalidateQueries({queryKey: KEY}),
        })
    )

}

//Actualiza un carro y refresca la lista con invalidateQueries
export function useEditarCarro(){
    const qc=useQueryClient()
    return useMutation({
        mutationFn:({id,datos}:{id:string,datos:Partial<Carro>})=>carrosService.update(id,datos),
        onSuccess:()=> qc.invalidateQueries({queryKey: KEY}),
    })
}



export function useCarros(){
    return useQuery({
        queryKey:KEY,
        queryFn: ()=>{

            console.log("GET EJECUTADO CON TANSTACK")
            return carrosService.getAll()
        },
        //STALETIME no significa cuanto tiempo se guardan los datos en cache
        //Si no cuanto tiempo los datos se concideran frescos y no datos viejos
        staleTime:1000*60*5

    })
}
//Hook personalizado useAgregar carro que encapsula lalogica de agregar un carro nuevo 
//Usa useMutation con mutationFn que llama a carrosService.add()
//onSuccess:invavlida la query 'carros' para refrescar la lista automaticamente
export function useAgregarCarro(){
    const qc=useQueryClient()
    return useMutation({
        mutationFn:(nuevo:Omit<Carro,'id'>)=> carrosService.add(nuevo),
        onSuccess:()=> qc.invalidateQueries({queryKey: KEY}),
})
}

