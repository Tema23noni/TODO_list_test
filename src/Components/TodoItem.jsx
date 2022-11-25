import React, { useState, useContext } from 'react'
import cl from './TodoStyle.module.scss';
import ready from '../img/Group 1.png';
import none from '../img/Group 2.png';
import rem from '../img/Group 3.png';
import OpenSetting from './setting/OpenSetting';
import Settings from './setting/Settings';
import { Context } from '../context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import 'dayjs/locale/ru.js';

dayjs.extend(relativeTime);

const TodoItem = ({todoTask}) => {
  const [openSettings, setOpenSettings] = useState(false); 
  const {handleComplite,handleDelete} = useContext(Context);
  return (
    <div className={cl.TodoItem}>
      <div className={cl.ready} onClick={() => handleComplite(todoTask)}>{todoTask.complited?<img src={ready}/>:<img src={none}/>}</div>
      <div className={cl.text}>
        <p>{todoTask.todoTask}</p>
        {todoTask.complited && <div className={cl.time}>{dayjs(todoTask.date).locale('ru').fromNow()}</div>}
      </div>
      <div className={cl.SettingBlock}>
        <OpenSetting setActive={setOpenSettings} active={openSettings}/>
        <div className={cl.remove} onClick={() => handleDelete(todoTask.id)}><img src={rem} width={20} height={20} alt="" /></div>
      </div>
      <Settings setActive={setOpenSettings} active={openSettings} todoTask={todoTask} />
    </div>
  )
}

export default TodoItem