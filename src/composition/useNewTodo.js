import { ref } from 'vue';
import * as todoStorage from '../utils/todoStorage';


export default function newTodo(todosRef) {
  const newTodoRef = ref('');

  const addTodo = () => {
    const value = newTodoRef.value && newTodoRef.value.trim();

    if (!value) {
      return;
    }
    
    const todo = {
        id: todoStorage.generateId(),
        title: value,
        completed: false
    }
    
    todosRef.value.push(todo)
    newTodoRef.value = ""
 
  };

  return {
    newTodoRef,
    addTodo,
  };
}
