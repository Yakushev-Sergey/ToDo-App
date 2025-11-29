
import { useState } from "react"
import TodoList from "./components/todoList/todoMain"
import { TaskOffPersonFilter } from "./components/taskOffPerson/taskOffPerson"
import { RightColumn } from "./components/theRightColumn/rightColumn"
import { CalendarMain } from "./components/calendar/calendar";
import type { User } from "./User";


export interface Task {
  id: string;
  title?: string;
  description: string;
  type: 'person' | 'official' | null;
  deadline?: string;
  status: 'active' | 'completed' | 'cancelled';
  userId: string;
  createdAt: string;
}

function App() {

  // пользователи 
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  //  массив из задач 
  const [listTask, setListTask] = useState<Task[]>([])

  // Состояние для календаря 
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // фильтр всех перс и офф 
  const [activeFilter, setActiveFilter] = useState<('person' | 'official')[]>([]);

  // задачи текущего пользователя 
  const userTasks = currentUser
    ? listTask.filter(task => task.userId === currentUser.id.toString() || task.userId === 'anonymous')
    : listTask.filter(task => task.userId === 'anonymous')

  const addNewTask = (newTask: Task) => {
    setListTask(prev => [...prev, newTask])
  }
  // выполнено или отменено 
  const updateTaskStatus = (taskId: string, newStatus: 'completed' | 'cancelled') => {
    setListTask(prev => prev.map(task => {
      if (task.id === taskId) {
        if (task.status === newStatus) {
          return { ...task, status: 'active' }
        }
        return { ...task, status: newStatus }
      }
      return task;
    }))
  }

  // удаление задачи  

  const deleteTask = (taskId: string) => {
    setListTask(prev => prev.filter(task => task.id !== taskId))
  }

  // счетчик задач персон и офф 
  const taskCount = {
    'person': userTasks.filter(task => task.type === 'person').length,
    'official': userTasks.filter(task => task.type === 'official').length
  }


  // функция фильтр всех перс и офф;  переключения фильтра

  const toggleFilter = (filter: 'person' | 'official') => {
    setActiveFilter(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter])
  };

  // фильтр выбора даты и Фильтрация задач

  const filterTasks = (selectedDate
    ? userTasks.filter(task => {
      if (!task.deadline) return false;
      //  Сравниваем только ДНИ (игнорируем год/месяц)
      const taskDay = task.deadline.split('T')[0].split('-')[2]; // "02"
      const selectedDay = selectedDate.split('-')[2]; // "02"
      return taskDay === selectedDay;
    }) : userTasks).filter(task => {
      if (activeFilter.length === 0) return true;
      return task.type && activeFilter.includes(task.type)
    })


  return (
    <>
      <div className="wrapper">
        <TaskOffPersonFilter
          taskCountPerson={taskCount.person}
          taskCountOff={taskCount.official}
          activeFilter={activeFilter}
          onFilterToggle={toggleFilter}
        />
        <div className="wrapperToDoList">
          <CalendarMain
            tasks={userTasks}
            onDateSelect={setSelectedDate}
            selectedDate={selectedDate}
          />
          <TodoList
            listTask={filterTasks}
            currentUser={currentUser}
            addNewTask={addNewTask}
            selectedDate={selectedDate}
            updateTaskStatus={updateTaskStatus}
            activeFilter={activeFilter}
            deleteTask={deleteTask}
          />
        </div>
        <RightColumn
          task={userTasks}
          currentUser={currentUser}
          onUserChange={setCurrentUser}
        />
      </div>
    </>
  )
}

export default App
