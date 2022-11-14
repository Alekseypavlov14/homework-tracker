import { FC } from 'react'
import { Title } from '../Title/Title'
import styles from './Header.module.css'

interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return (
    <div className={styles.Header}>
      <Title>
        HomeWork Tracker
      </Title>
    </div>
  )
}
