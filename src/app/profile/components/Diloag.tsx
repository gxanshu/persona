import { forwardRef } from 'react'

const Modal = (props: any, ref: any) => {
  const closeModal = () => {
    ref.current.close()
  }

  return (
    <dialog ref={ref}>
      <span onClick={closeModal}>You can see me</span>
    </dialog>
  )
}

export default forwardRef(Modal)
