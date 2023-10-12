import React, { ReactNode, Ref } from 'react'
export * from './AudioRecorder'
export * from './Logo'
export * from './ModalIcons'
export * from './PanelIcons'
export * from './Play'
export * from './ProfileIcons'
export * from './RightArrow'
export * from './SocialCards'
export * from './Username'
export * from './Warning'

// IconContainer component
interface IconContainerProps {
  className?: string
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

const IconContainer: React.FC<IconContainerProps> = ({ className, ref, children }) => {
  return <div className={className}>{children}</div>
}

// IconFrame component
interface IconFrameProps {
  className: string
  children: ReactNode
}

const IconFrame: React.FC<IconFrameProps> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}

// Icon component
interface IconProps {
  containerClass?: string
  frameClass: string
  children: ReactNode
  ref?: Ref<HTMLDivElement>
}

const Icon: React.FC<IconProps> = ({ containerClass, frameClass, children, ref }) => {
  return (
    <IconContainer className={containerClass} ref={ref}>
      <IconFrame className={frameClass}>{children}</IconFrame>
    </IconContainer>
  )
}

export { Icon, IconContainer, IconFrame }
