const LOCAL_KEY = 'todo';

export function fetch() {
  const res = localStorage.getItem(LOCAL_KEY);
  if (res) {
    return JSON.parse(res);
  }
  return [];
}

export function save(todos){
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

export function generateId(){
    return Math.random().toString(16).slice(2,4)
}

export function filter(todos, visibility="all"){
  if(visibility==="all"){
    return todos
  }
  if(visibility === "active"){
    return todos.filter(it=>!it.completed)
  }
  if(visibility === "completed"){
    return todos.filter(it=>it.completed)
  }
  throw new Error("invalid visibility")
}