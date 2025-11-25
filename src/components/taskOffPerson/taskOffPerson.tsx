import offPersStyle from './taskOffPerson.module.css'

interface taskCount {
  taskCountPerson: number,
  taskCountOff: number,
  activeFilter: ('person' | 'official')[];
  onFilterToggle: (filter: 'person' | 'official') => void;
}


export const TaskOffPersonFilter = ({taskCountPerson, taskCountOff, activeFilter, onFilterToggle }: taskCount) => {

  
  return (
    <>
      <div className={offPersStyle.offPersonWrapper}>
        <div className={` ${offPersStyle.person} ${activeFilter.includes('person') ? offPersStyle.active : '' }`} onClick={() => onFilterToggle('person')}>
          {taskCountPerson}
          <p className={offPersStyle.text }> Персональные </p>
        </div>
        <div className={` ${offPersStyle.off } ${activeFilter.includes('official') ? offPersStyle.active : ''} `} onClick={() => onFilterToggle('official')}>
          {taskCountOff}
          <p className={offPersStyle.text }> Офицальные  </p>
        </div>
      </div>
    </>
  )
}