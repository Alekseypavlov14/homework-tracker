import { FC } from 'react'
import styles from './Anchor.module.css'

interface AnchorProps {
  href: string
  children: string
}

export const Anchor: FC<AnchorProps> = ({
  href,
  children
}) => {
  return (
    <a
      href={href}
      className={styles.Anchor}
      children={children}
      target='_blank'
      rel='noreferrer'
    />
  )
}