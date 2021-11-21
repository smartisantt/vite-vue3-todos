import { ref, computed } from 'vue';
export default function useEditTodo(todosRef) {
  const editingTodoRef = ref(null);

  let oldTitle;
  const editTodo = (todo) => {
    oldTitle = todo.title;
    editingTodoRef.value = todo;
  };

  const cancel = (todo) => {
    editingTodoRef.value = null;
    todo.title = oldTitle;
  };

  const confirm = (todo) => {
    editingTodoRef.value = null;
    const title = todo.title.trim();
    if (title) {
      todo.title = title;
    } else {
      const index = todosRef.value.indexOf(todo);
      console.log(index);
      if (index > -1) {
        todosRef.value.splice(index, 1);
      }
    }
  };

  const allDoneRef = computed({
    get() {
      return todosRef.value.filter((it) => !it.completed).length === 0;
    },
    set(value) {
      todosRef.value.forEach((it) => (it.completed = value));
    },
  });

  return {
    editingTodoRef,
    editTodo,
    cancel,
    confirm,
    allDoneRef,
  };
}
