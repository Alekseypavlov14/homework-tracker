import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

interface NotFoundPageProps {}

export const NotFoundPage: FC<NotFoundPageProps> = () => {
  return (
    <div className={styles.NotFoundPage}>
      <div className={styles.Content}>
        <div className={styles.Title}>
          The page is not found
        </div>
        <div className={styles.Text}>
          Check the URL or write the address again
        </div>

        <Link className={styles.Link} to='/'>
          <FontAwesomeIcon icon={faArrowLeft} />
          &nbsp;Home
        </Link>
      </div>
    </div>
  )
}