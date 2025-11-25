
import type { Task } from '../../App'
import calendarStyle from './calendar.module.css'

interface CalendarProps {
  tasks: Task[];
  selectedDate: string | null;
  onDateSelect: (date: string | null) => void;
}

export const CalendarMain = ({ tasks, selectedDate, onDateSelect }: CalendarProps) => {

  // ДОБАВЛЯЕМ: подсчет задач по датам
  const getTaskCountByDate = () => {
    const counts: { [key: string]: number } = {};
    tasks.forEach(task => {
      if (task.deadline) {
        const taskDay = task.deadline.split('T')[0].split('-')[2];
        counts[taskDay] = (counts[taskDay] || 0) + 1
      }
    });
    return counts;
  }
  const tasksCountByDate = getTaskCountByDate();

  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

  // Генерируем даты текущей недели
  const getCurrentDates = () => {
    const dates = [];

    for (let i = 1; i < 31; i++) {
      const dayIndex = (i - 1) % 7;
      const fulDate = `2024-01-${i.toString().padStart(2, '0')}`;
      const dayNumber = i.toString().padStart(2, '0');
      dates.push({
        dayName: days[dayIndex],
        dateNumber: i,
        fulDate: fulDate,
        hasTask: tasksCountByDate[dayNumber] > 0,
      });
    }
    return dates
  }

  const weekDates = getCurrentDates();

  return (
    <>
      <div className={calendarStyle.calendarWrapper}>
        {
          weekDates.map(({ dayName, dateNumber, fulDate, hasTask }) => (
            <div key={fulDate}
              className={`${calendarStyle.calendar} ${selectedDate === fulDate ? calendarStyle.selected : ''}`}
              onClick={() => { selectedDate === fulDate ? onDateSelect(null) : onDateSelect(fulDate) }} >
              <span className={calendarStyle.days} >{dayName}</span>
              <span className={calendarStyle.data} >{dateNumber}</span>
              {
                hasTask && (
                  <div className={calendarStyle.taskDot}></div>
                )
              }
            </div>
          ))
        }
      </div>
    </>
  )
}