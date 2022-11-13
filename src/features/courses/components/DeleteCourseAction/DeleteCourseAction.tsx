import { FC, useState } from 'react'
import { CourseAction } from '../CourseAction/CourseAction'
import { deleteCourse } from './../../slice/courses.slice'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Confirm } from 'standard-ui'

interface DeleteCourseActionProps {
  id: number
}

export const DeleteCourseAction: FC<DeleteCourseActionProps> = ({ id }) => {
  const [isConfirmOpened, setConfirmOpened] = useState(false)

  const openConfirm = () => setConfirmOpened(true)
  const closeConfirm = () => setConfirmOpened(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deleteCourseHandler = () => {
    dispatch(deleteCourse({ id }))
    navigate('/')
  }
  
  return (
    <>
      <CourseAction
        title='Delete this course'
        buttonText='Delete'
        buttonAction={openConfirm}
        danger
      />
      
      {isConfirmOpened && (
        <Confirm
          title='Are you sure?'
          onConfirm={deleteCourseHandler}
          onClose={closeConfirm}
        />
      )}
    </>
  )
}