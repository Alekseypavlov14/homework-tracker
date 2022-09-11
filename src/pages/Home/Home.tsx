import { FC } from 'react'
import { Header } from '../../components/Header/Header'
import styles from './Home.module.css'

interface HomeProps {}

export const Home: FC<HomeProps> = () => {
  return (
    <div className={styles.Home}>
      <Header />
    </div>
  )
}