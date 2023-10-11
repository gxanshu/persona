interface ModalStartPhotoProps {
  step: () => void
}

const ModalStartPhoto: React.FC<ModalStartPhotoProps> = props => {
  return (
    <div className="flex flex-col items-center justify-between pt-[74px] gap-[48px] w-full">
      <div className="flex gap-[20px] max-w-full snap-x snap-mandatory overflow-x-auto no-scrollbar">
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-[40px]"></div>
        </div>
        <CardSection />
        <CardSection />
        <CardSection />
        <div className="snap-center shrink-0">
          <div className="shrink-0 w-4 sm:w-[40px]"></div>
        </div>
      </div>
      <div className="px-[64px] pb-[64px] w-full">
        <button
          onClick={() => props.step()}
          className="p-[12px] flex items-center justify-center rounded-[16px] text-[#1D1D1F] text-[15px] leading-[20px] font-[500] bg-[#F2F2F2] w-full"
        >
          I'm sure
        </button>
      </div>
    </div>
  )
}

const CardSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-[16px] min-w-[400px]">
      <div className="w-full h-[250px] bg-gray-50 rounded-xl" />
      <h2 className="break-words text-center text-[33px] leading-[40px] font-[700]">Watch Premium Content</h2>
      <p className="w-[90%] text-[#494949] text-[15px] leading-[150%] text-center">
        A dedicated number for your users to chat with your Persona. Don’t worry it’s AI managed.
      </p>
    </div>
  )
}
