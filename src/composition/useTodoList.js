import  * as todoStorage from '../utils/todoStorage'
import { ref, watchEffect } from 'vue';

export default function useTodoList(){
    const todosRef = ref(todoStorage.fetch())
    
    watchEffect(()=>{
        todoStorage.save(todosRef.value)
    })

    return {
      todosRef
    }
}