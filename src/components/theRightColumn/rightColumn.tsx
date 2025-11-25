import { useState } from 'react'
import { RegistrationForm } from '../registrationForm/registrationForm'
import rightColumnStyle from './RightColumnStyle.module.css'
import type { User } from '../../User'
import avater from './ava.jpg'
import { WaterProgress } from '../progress/progress'
import type { Task } from '../../App'

interface RightColumnProps {
  task: Task[];
  currentUser: User | null;
  onUserChange: (user: User | null) => void;
}

export const RightColumn = ({ task, currentUser, onUserChange  }:RightColumnProps) => {


  const [showMenu, setShowMenu] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Функция для расчета прогресса
  const getCompletionStatus = () => {
    const totalTask = task.length;
    const complitedTask = task.filter(task => task.status === 'completed').length
    const precentage = totalTask > 0 ? Math.round((complitedTask / totalTask) * 100) : 0
    return {totalTask, complitedTask, precentage}
  };

  const completionStats = getCompletionStatus()


  const toggleMenu = () => {
    if (currentUser) {
      setShowMenu(prev => !prev)
    } else {
      setShowForm(prev => !prev)
    }
  }

  const handleLogOut = () => {
    onUserChange(null)
    setShowMenu(false)
    setShowForm(false)
  }

  const handleUserCheng = (user: User | null) => {
    onUserChange(user) 
    if(user ) {
      setShowForm(false)
    }
  }

  return (
    <>
      <div className={rightColumnStyle.rightColumnWrapper}>

        <div className={rightColumnStyle.userAvaterWrapper}>
          <p className={rightColumnStyle.nameUsers} > {currentUser?.username} </p>
          <button className={rightColumnStyle.btnAvatarUsers} onClick={toggleMenu}>
            <img src={avater} alt="avatar" />
          </button>
        </div>
        
        {showMenu && currentUser && (
          <div className={rightColumnStyle.wrapperBtnOut}>
            <button className={rightColumnStyle.btnOut} onClick={handleLogOut}>Выход</button>
          </div>
        )
        }

        {showForm && !currentUser && (
          <RegistrationForm
            onUserChange={handleUserCheng}
          />
        )}

        <WaterProgress 
        percentage={completionStats.precentage}
        />
      </div>
    </>
  )
}