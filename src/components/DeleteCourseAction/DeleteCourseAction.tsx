import { FC } from 'react'
import { useInteraction } from '../../hooks/useInteraction'
import { CourseAction } from '../CourseAction/CourseAction'
import { deleteCourse } from '../../store/slices/courses/coursesSlice'
import { ConfirmPopup } from '../ConfirmPopup/ConfirmPopup'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

interface DeleteCourseActionProps {
  id: number
}

export const DeleteCourseAction: FC<DeleteCourseActionProps> = ({ id }) => {
  const [interaction, pushInteraction] = useInteraction()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  function deleteCourseHandler() {
    pushInteraction({
      message: 'Are you sure you want to delete the course?',
      confirm() {
        dispatch(deleteCourse({ id }))
        navigate('/')
      }
    })
  }
  return (
    <>
      <CourseAction
        title='Delete this course'
        buttonText='Delete'
        buttonAction={deleteCourseHandler}
        danger
      />
      
      {interaction && (
        <ConfirmPopup 
          message={interaction.message}
          confirm={interaction.confirm}
          cancel={interaction.cancel}
        />
      )}
    </>
  )
}