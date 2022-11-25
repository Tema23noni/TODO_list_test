import React, { useContext, useEffect, useState } from 'react'
import cl from './Settings.module.scss';
import { ref, uploadBytesResumable, getDownloadURL, listAll, deleteObject } from 'firebase/storage';
import { storage } from '../../firebase';
import { Context } from '../../context';
const Settings = ({todoTask,active, setActive}) => {
  const {handleEdit, files, handleDeleteFile,handleDownloadFile, progress ,handleComplite, handleDelete, handleUploadFiles} = useContext(Context)
  
  const [file, setFile] = useState();
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    handleUploadFiles(file,todoTask);
  };

  return (
    <div className={active? `${cl.menu} ${cl.active}`: cl.menu} onClick={() => setActive(false)}>
    <div className={cl.blur}>
      <div className={cl.menu__cont} onClick={(e) => e.stopPropagation()}>
        <h2><span>Настройки</span></h2>
        <div  className={cl.ChangeTodo}>
          <p><span>Изменить дело</span></p>
          <input type="text" value={todoTask.todoTask} onChange={(e) => handleEdit(todoTask,e.target.value)} />
        </div>
        <form onSubmit={formHandler} className={cl.addFile}>  
          <input type="file" onChange={(e) => setFile(e.target.files[0].name)}/>
          <label className={cl.updateFile}>
            {!file? <p>Добавить файл</p>: <p>{file}</p> }
            {(progress !== 0 || progress !== 100) && <p>{progress}%</p>}
          </label>
          {
            file && <button>Сохранить</button>
          }
        </form>
        <div className={cl.btnOption}>
          <button className={cl.complited} onClick={() => handleComplite(todoTask)}>Выполнено</button>
          <button className={cl.delete} onClick={() => {
            setActive(false);
            handleDelete(todoTask.id);
          }
            }>Удалить</button>
        </div> 
        <div className={cl.files}>
          {
            files !== []
            ?
            files.map((e,i) =>{
              return (<div className={cl.file} key={e.name}>
                <p onClick={() => handleDownloadFile(e.name, todoTask)} >{e.name}</p>
                <button onClick={() => handleDeleteFile(e.name, todoTask)} className={cl.delete}>Удалить</button>
                </div>)
            })
            :
            ''
          }
        </div>
      </div>
      </div>
  </div>
  )
}

export default Settings