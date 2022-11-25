import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot,doc,updateDoc, deleteDoc } from 'firebase/firestore';
import { db,storage } from '../firebase';
import TodoItem from './TodoItem';
import cl from './TodoStyle.module.scss';
import { deleteObject, getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { Context } from '../context';
const TodoItems = () => {
  const [files, setFiles] = useState([]);
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState(0);
  useEffect(() =>{
    return () => fetchTodo()
  },[]);
  const fetchTodo = () =>{
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({...doc.data(), id: doc.id})
      })
      setTodos(todoArr)
    });
    return () => unsubscribe()
  }
  const handleEdit = async (todo, newTodoTask ) => {
    console.log(todo, newTodoTask)
    await updateDoc(doc(db, "todos", todo.id), { todoTask: newTodoTask });
  };
  const handleComplite = async(todo) =>{
    await updateDoc(doc(db, "todos", todo.id),{
      complited: !todo.complited,
      date: Date.now(),
    })
  }
  const handleDelete = async(id) =>{
    await deleteDoc(doc(db, "todos", id))
  }
  const handleFile = async(id,file)=>{

    await updateDoc(doc(db, 'todos', id),{
      files: file['name']
    })
  }
  const handleUploadFiles = (file, todo) => {
    if (!file) return;
    const sotrageRef = ref(storage, `files/${todo.id}/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),

    );
    uploadAllFiles(todo.id);
  };
  const handleDownloadFile = (fileName, todo) =>{
    const downlRef = ref(storage, `files/${todo.id}/${fileName}`);
    getDownloadURL(downlRef)
      .then(url =>{
        window.open(url);
      })
    uploadAllFiles(todo.id);
  }
  const handleDeleteFile = (fileName,todo) =>{
    const delRef = ref(storage, `files/${todo.id}/${fileName}`);
    deleteObject(delRef)
      .then((res) => console.log('file delete' + res))
      .catch(err => alert(err));
    uploadAllFiles(todo.id);
  }
  const uploadAllFiles = (id) =>{
    const fileListRef = ref(storage, `files/${id}/`);
    listAll(fileListRef)
      .then(res =>{
        setFiles(res['items'])
      })
  }
  return (
    <Context.Provider value={{
      handleComplite,handleDelete,progress, files, uploadAllFiles,handleEdit,handleFile,handleUploadFiles,handleDownloadFile,handleDeleteFile,
    }}>
    <div className={cl.TodoItems}>
      {
        todos.map(todo =>{
          return <TodoItem key={todo.id} todoTask={todo} id={todo.id}/>
        })
      }
    </div>
    </Context.Provider>
  )
}

export default TodoItems