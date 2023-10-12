import { Dispatch, SetStateAction, useEffect, useState } from "react"
import PreTextInput, { InputState } from "~/components/inputs/PreTextInput"
import ShownError from "~/components/inputs/ShowError"
import { authFlow } from "../page"
import { TextInput } from "~/components/inputs"
import { useRouter } from "next/navigation"

const LinkSection = (props: { setFlow: Dispatch<SetStateAction<authFlow>> }) => {
  const [value, setValue] = useState<string>('')
  const [inputState, setInputState] = useState<InputState>(null)
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [usernameSeleted, setUsernameSelected]= useState(false)
  const [name, setName] = useState<string>("")
  const router = useRouter()

  async function delayAndReturnTrue() {
    return new Promise(resolve => {
      setTimeout(() => {
        if (value === 'vish') {
          resolve(true)
        } else {
          resolve(false)
        }
      }, 3000)
    })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (value !== '') {
        console.log(value)
        setInputState('loading')
        const result = await delayAndReturnTrue()
        if (result) {
          setInputState('success')
        } else {
          setInputState('error')
        }
      }
    }, 150)

    return () => clearTimeout(delayDebounceFn)
  }, [value])

  useEffect(() => {
    if (name.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [name])

  const handleNameSubmit = () => {
    router.push(`${name}`)
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="font-[700] text-[33px] leading-[40px] text-[#1D1D1F]">Let’s make your clone</h1>
      <p className="text-[#494949] mt-[16px] font-[17px] leading-[24px] ">
        The good ones are still available!
      </p>
      <div>
        <div className="mt-20 mb-4">
          <PreTextInput
            type="text"
            placeholder="username"
            value={value}
            setValue={setValue}
            preText="persona.me"
            inputState={inputState}
            setInputState={setInputState}
            autoFocus
          />
        </div>
        <div className="mt-4 h-[58px] sm:h-[48px]">
          {usernameSeleted ? (<TextInput
            label="Your Name"
            name="full-name"
            value={name}
            required={true}
            setValue={(value: string) => setName(value)}
            actionButton={true}
            disabled={false}
            buttonDisabled={buttonDisabled}
            haveError={() => false}
            handleSubmit={handleNameSubmit}
            className="rounded-[13px]"
          />) : (<div>{inputState == 'loading'
            ? (
              <button
                className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
                disabled={true}
                type="submit"
              >
                <div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
              </button>
            )
            : (null)}
          {inputState == 'error'
            ? <ShownError error={'This username seems to be taken already... Try something similar.'} />
            : (null)}
          {inputState == 'success'
            ? (
              <button
                className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
                disabled={false}
                onClick={()=> setUsernameSelected(true)}
                type="submit"
              >
              <div className="text-white text-[14px] leading-[20px] font-bold h-full">Grab my Link</div>
              </button>
            )
            : (null)}</div>)}
        </div>
      </div>
    </div>
  )
}

export default LinkSection


          