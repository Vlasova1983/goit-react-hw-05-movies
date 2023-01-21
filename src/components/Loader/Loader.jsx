import { RotatingLines } from  'react-loader-spinner'
import styles  from '../Loader/Loader.module.css';

export const Loader = () => { 
  return (
  <div className={styles.Loader}>
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  </div>
  )
}