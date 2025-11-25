import btnTaskStyle from './btnTask.module.css';
import btnAddImg from './btnAdd.png';
import inputAddBtn from './inputAdd.png';
import React, { useState } from 'react'; import type { Task } from '../../App';
import type { User } from '../../User';
;

interface BtnTaskAddProps {
  addNewTask: (task: Task) => void;
  currentUser: User | null;
}

export const BtnTaskAdd = ({ addNewTask, currentUser }: BtnTaskAddProps) => {

  // кнопки радио 
  const [selectedType, setSelectedType] = useState<'person' | 'official' | null>(null)
  // Заголовок и задача
  const [taskText, setTaskTextLocal] = useState('')
  const [description, setDescription] = useState('')
  // выбор времени дедлайна 
  const [deadline, setDeadline] = useState('')
  // тогл главной кнопки 
  const [isFormOpen, setIsFormOpen] = useState(false)

  // событие записи задачи 
  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTextLocal(e.target.value)
  }
  // собите записи заголовок 
  const fandleInputDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  // кнопки радио 
  const handleTypeChange = (type: 'person' | 'official' | null) => {
    setSelectedType(type)
  }

  // событие выбора дедлайна 
  const handeDeadlineChenge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeadline(e.target.value)
  }

  // тогл Главной кнопки 
  const handleIsOpenForm = () => {
    setIsFormOpen(prev => !prev)
  }

  const fandleAddTask = () => {

    if (taskText.trim() && description.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: description,
        description: taskText,
        type: selectedType,
        deadline: deadline,
        status: 'active',
        userId: currentUser?.id.toString() || 'anonymous',
      }
      addNewTask(newTask)
      setTaskTextLocal('')
      setDescription('')
      setSelectedType(null)
      setDeadline("")
      setIsFormOpen(false)
    }
  }




  return (
    <>
      <div className={`${btnTaskStyle.inputTaskWrapper} ${isFormOpen ? btnTaskStyle.open : ''} `}>
        <div>
          <label className={btnTaskStyle.labelDeadLine} htmlFor="deadline">Выберите дедлайн:</label>
          <input
            className={btnTaskStyle.inputDeadLine}
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={deadline}
            onChange={handeDeadlineChenge}
          />
        </div>


        <div className={btnTaskStyle.radioWrapper}>

          <label className={btnTaskStyle.labelRadio} htmlFor="option1">
            <input className={btnTaskStyle.inputRadio}
              name="taskType"
              id='option1' type="radio"
              checked={selectedType === 'person'}
              onChange={() => handleTypeChange('person')} />
            Персональная
          </label>

          <label className={btnTaskStyle.labelRadio} htmlFor="option2">
            <input className={btnTaskStyle.inputRadio}
              name="taskType"
              type="radio" id="option2"
              checked={selectedType === 'official'}
              onChange={() => handleTypeChange('official')} />
            Офицальная
          </label>

        </div>
        <input className={btnTaskStyle.inputTaskTitle}
          type="text" maxLength={30}
          placeholder='Заголовок '
          name="taskTitle"
          value={description}
          onChange={fandleInputDescription}
        />
        <input
          className={btnTaskStyle.inputTask}
          type="text" maxLength={70}
          name="taskDescription"
          placeholder='Задача'
          value={taskText}
          onChange={handleInputText}
        />
        <button className={btnTaskStyle.btnAddInput} onClick={fandleAddTask} ><img src={inputAddBtn} alt="" /></button>
      </div >

      <div className={btnTaskStyle.btntaskWrapper} onClick={handleIsOpenForm}>
        <button className={` ${btnTaskStyle.btnAdd} ${isFormOpen ? btnTaskStyle.rotated : ''}`}>
          <img src={btnAddImg} alt="" />
        </button>
      </div>
    </>
  )
}