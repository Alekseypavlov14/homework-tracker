import { ChangeEvent, FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Anchor } from '../Anchor/Anchor'
import { CourseAction } from '../CourseAction/CourseAction'
import { updateZoomLink } from '../../store/slices/courses/coursesSlice'
import styles from './ZoomLinkAction.module.css'

interface ZoomLinkActionProps {
  link: string
  id: number
}

export const ZoomLinkAction: FC<ZoomLinkActionProps> = ({ link, id }) => {
  const [isUpdating, setUpdating] = useState<boolean>(false)
  const [zoomLink, setZoomLink] = useState<string>(link)

  const dispatch = useDispatch()

  const updateZoomLinkHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomLink(e.target.value)
  }

  const toggleUpdating = () => {
    setUpdating(updating => !updating)
  }

  const saveZoomLink = () => {
    dispatch(updateZoomLink({
      id, zoomLink
    }))

    setUpdating(false)
  }

  const ZoomLinkOrText = link.length 
    ? (<Anchor href={link} children={link} />) 
    : (<>There isn't a link</>)

  const buttonText = isUpdating ? 'Close' : 'Update'

  return (
    <CourseAction
      title='Zoom Link:'
      buttonText={buttonText}
      buttonAction={toggleUpdating}
    >

    {isUpdating 
      ? (
        <div className={styles.UpdateSection}>
          <input
            className={styles.UpdateInput}
            placeholder='Zoom link...'
            onChange={updateZoomLinkHandler}
            value={zoomLink}
          />
          <button 
            className={styles.SaveButton}
            onClick={saveZoomLink}
          >
            Save
          </button>
        </div>
      ) : ZoomLinkOrText}
    </CourseAction>
  )
}