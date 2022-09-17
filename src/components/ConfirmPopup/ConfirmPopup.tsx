import { FC } from 'react'
import styles from './ConfirmPopup.module.css'
import cn from 'classnames'

interface ConfirmPopupProps {
  message: string
  confirm: () => void
  cancel: () => void
}

export const ConfirmPopup: FC<ConfirmPopupProps> = ({
  message,
  confirm,
  cancel
}) => {
  return (
    <div className={styles.ConfirmPopupBackground}>
      <div className={styles.ConfirmPopup}>
        <div className={styles.Message}>
          {message}
        </div>

        <div className={styles.DecisionButtons}>
          <button 
            className={cn(styles.Button, styles.Confirm)} 
            onClick={confirm}
          >
            Confirm
          </button>

          <button 
            className={cn(styles.Button, styles.Cancel)}
            onClick={cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}