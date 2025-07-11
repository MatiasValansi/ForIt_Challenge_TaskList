import { supabase } from "../db/supabase.js"

export const TaskSupabaseRepository = {

    getAll : async () => {
        let { data: tasks, error } = await supabase
        .from('tasks')
        .select('*')          
        
        if (error) {
            console.error("Error Supabase: ", error);
            return []
        }

        return  tasks 
    },

    getById : async (id) => {        
        let { data: idTask, error } = await supabase
        .from('tasks')
        .select("*")
        .eq('id', id)
        .single() //Me permite tranformar el resultado de la query en un objeto en vez de un array

        if (error) {
            console.error("Error Supabase: ", error);
            return []
        }

        return idTask // Si no usara .single(), podría retornar idTask?.[0], esto devuelve el objeto con el ID buscado por eso [0]. Si devolviera idTask, este es un array con dicho objeto, NO el objeto en si
    },

    createOne : async (taskToCreate) => {        
        const { data:taskCreated, error } = await supabase
        .from('tasks')
        .insert([taskToCreate])
        .select()
        .single()

        if (error) {
            console.error("Error Supabase: ", error);
            return []
        }

        return taskCreated
    },

    updateOneById : async (idToUpdate, taskToUpdated) => {
        const { data, error } = await supabase
        .from('tasks')
        .update(taskToUpdated)
        .eq('id', idToUpdate)
        .select()
        .single()

        if (error) {
            console.error("Error Supabase: ", error);
            return []
        }

        return data
    },

    deleteOneById : async (idToDelete) => {
    //Primero busco el ID a eliminar para verificar que existe, como buena práctica aprendida en la facultad, y luego lo elimino
        
        let { data: idTaskToDelete, error: e } = await supabase
        .from('tasks')
        .select("*")
        .eq('id', idToDelete)
        .single()

        if (e) {
            console.error("Error Supabase: ", e);
            return []
        }
        
        const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', idToDelete)

        if (error) {
            console.error("Error Supabase: ", e);
            return []
        }

        return idTaskToDelete
    }
}
