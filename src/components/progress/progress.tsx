import progressStyle from './progress.module.css';

interface waterProgressProps {
  percentage: number;

}


export const WaterProgress = ({ percentage }: waterProgressProps) => {

  return (
    <>
      <div className={progressStyle.wrapper}>

        <div className={progressStyle.water} style={{
          height: `${percentage}%`,
          // Двигаем волну в зависимости от процента для эффекта "наливания"
          transform: `translateY(${100 - percentage}%)`
        }}>
          <div className={progressStyle.wave}></div>
          <div className={progressStyle.wave}></div>
        </div>
        <div className={progressStyle.percentage}>
            {percentage}%
        </div>
      </div>
    </>
  )
}