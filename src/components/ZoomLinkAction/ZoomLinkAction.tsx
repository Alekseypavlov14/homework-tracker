import { FC } from 'react'
import { Anchor } from '../Anchor/Anchor'
import { CourseAction } from '../CourseAction/CourseAction'

interface ZoomLinkActionProps {
  link: string
}

export const ZoomLinkAction: FC<ZoomLinkActionProps> = ({ link }) => {
  const ZoomLinkOrText = link.length ? (
    <Anchor 
      href={link}
      children={link}
    />
  ) : (
    <>There isn't a link</>
  )

  return (
    <CourseAction
      title='Zoom Link:'
      buttonText='Update'
      buttonAction={() => {}}
    >
      {ZoomLinkOrText}
    </CourseAction>
  )
}