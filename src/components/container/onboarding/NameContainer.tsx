import { Lexend } from 'next/font/google'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AuthFlow } from '.';
import PreTextInput, { InputState } from '~/components/inputs/PreTextInput';
import { useRouter } from 'next/navigation';
import { TextInput } from '~/components/inputs';
import ShownError from '~/components/inputs/ShowError';
const lexend = Lexend({ subsets: ['latin'], weight: ['600', '400'] })

// name & username
const NameContainer = (props: { setFlow: Dispatch<SetStateAction<AuthFlow>> })=> {
	const [value, setValue] = useState<string>('')
  const [inputState, setInputState] = useState<InputState>(null)
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

  const handleNameSubmit = () => {
    router.push(`${name}`)
  }

	return (
		<div className='flex flex-col gap-[32px] max-w-[390px]'>
			<div className={`flex flex-col gap-[12px] ${lexend.className}`}>
				<h2 className={`text-[#1D1D1F] text-[33px] font-semibold tracking-[-0.66px]`}>Let’s make your clone</h2>
				<p className='text-[#494949] text-[15px] leading-[20px] '>Enter your name and get unique link</p>
				</div>
				<div className='inline-flex flex-col gap-[24px]'>
          <TextInput
            label="Your Name"
            name="full-name"
            value={name}
            required={true}
            setValue={(value: string) => setName(value)}
            actionButton={false}
            disabled={false}
            haveError={() => false}
            className="rounded-[13px]"
            // autoFocus
          />
					<PreTextInput
            type="text"
            placeholder="username"
            value={value}
            setValue={setValue}
            preText="persona.me"
            inputState={inputState}
            setInputState={setInputState}
            wrapperClass='w-[390px] h-[52px]'
          />
          {inputState == "success" ? (<button
            className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
            onClick={handleNameSubmit}
            type="submit"
            >
            <p className="text-white text-[14px] leading-[20px] font-bold h-full">Clone me</p>
          </button>)  :(
            inputState == "error" ? (
              <ShownError error={'This username seems to be taken already... Try something similar.'}/>
            ) : (<button
            className="shadow-sm py-[16px] px-[10px] bg-black rounded-[12px] transition-transform overflow-hidden flex items-center justify-center w-full disabled:bg-gray-800"
            disabled={true}
            type="submit"
            >
            <p className="text-white text-[14px] leading-[20px] font-bold h-full">Clone me</p>
          </button>)
          )}
				</div>
		</div>
	)
}

export default NameContainer;