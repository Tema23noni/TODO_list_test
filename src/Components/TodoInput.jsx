import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import cl from './TodoStyle.module.scss';
const TodoInput = () => {
  const [todoTask , setTodoTask] = useState();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(todoTask !== ""){
      await addDoc(collection(db, "todos"),{
        todoTask,
        complited: false,
      });
      setTodoTask("")
    }
  }
  return (
    <form className={cl.TodoInput} onSubmit={handleSubmit}>
        <div className={cl.cont}>
            <input type="text" placeholder='Ввод...' value={todoTask} onChange={(e) => setTodoTask(e.target.value)}  />
            <button>Сохранить</button>
        </div>
    </form>
  )
}

export default TodoInput