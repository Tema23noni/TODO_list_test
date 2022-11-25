
import cl from './App.module.scss';
import TodoInput from './Components/TodoInput';
import TodoItems from './Components/TodoItems';

function App() {
  return (
    <div className={cl.cont}>
      <p className={cl.logoText}>Todo List</p>
       <div className={cl.todo}>
        <TodoInput/>
        <TodoItems/>
      </div>
    </div>
  );
}

export default App;
