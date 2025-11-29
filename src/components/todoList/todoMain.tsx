
import { BtnTaskAdd } from '../btnAddTask/btnTaskAdd'
import todoMainStyle from './todoMain.module.css'
import btnDell from './btnDell.png'
import btnDone from './btnDone.png'
import type { Task } from '../../App';
import type { User } from '../../User';


interface TodoListProps {
  listTask: Task[];
  addNewTask: (task: Task) => void;
  currentUser: User | null;
  // для умного заголовка показ выбранной даты 
  selectedDate: string | null;
  updateTaskStatus: (taskId: string, newStatus: 'completed' | 'cancelled') => void;
  activeFilter: ('person' | 'official')[];
  deleteTask: (taskId: string) => void;
}

const TodoList = ({ currentUser, listTask, addNewTask, selectedDate, updateTaskStatus, activeFilter, deleteTask }: TodoListProps) => {


  // выбор цвета задачи при условии 
  const getTaskColor = (type: 'person' | 'official' | null) => {
    switch (type) {
      case 'person': return '#F5B0B5';
      case 'official': return '#9698D1';
      default: return '#f0f0f0';
    }
  }

  // формат времени 
  const formatTime = (deadline: string) => {
    if (!deadline) return '';
    const date = new Date(deadline)
    return date.toLocaleTimeString('ru-Ru', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // формат числа для заголовка 
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate()
  }

  // умный заголовок а автор тупой xd

  const getSmartTitle = () => {
    const filters = {
      all: activeFilter.length === 0 || activeFilter.length === 2,
      person: activeFilter.includes('person'),
      official: activeFilter.includes('official')
    }
    const typeText = filters.all ? 'Все' : filters.person ? 'Персональные' : 'Официальные';
    const dataText = selectedDate ? ` за ${formatDate(selectedDate)} число` : '';
    return `${typeText} задачи ${dataText}`
  }


  return (
    <>
      {/* <div className='container'> */}
      <section className={todoMainStyle.taskWrapper}>
        <h1 className={todoMainStyle.taskTitke}>
          {getSmartTitle()}
        </h1>
        {
          listTask.map(task => (
            
              <div key={task.id} className={todoMainStyle.task} style={{ backgroundColor: getTaskColor(task.type) }} >
                {task.deadline && (
                  <span className={todoMainStyle.Totime}>
                    До
                    <span className={todoMainStyle.time}>{formatTime(task.deadline)}</span>
                  </span>
                )}

                {task.description && (
                  <h1 className={todoMainStyle.title}>{task.title}</h1>
                )}

                <h2 className={todoMainStyle.taskText}>{task.description}</h2>

                <div className={todoMainStyle.btnWrapper}>
                  {task.status !== 'cancelled' && (
                    <button className={todoMainStyle.btnDone} onClick={() => updateTaskStatus(task.id, 'completed')}>
                      <img src={btnDone} />
                    </button>
                  )}

                  {task.status !== 'completed' && (
                    <button className={todoMainStyle.btnDell} onClick={() => deleteTask(task.id)}>
                      <img src={btnDell} />
                    </button>
                  )}

                </div>
              </div>
            
          ))
        }
        {
          listTask.length === 0 && (
            <p>Тут пока нет задач</p>
          )
        }


      </section>
      <BtnTaskAdd
        addNewTask={addNewTask}
        currentUser={currentUser}
      />
    </>
  )
}

export default TodoList