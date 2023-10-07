import React, { useState } from 'react';
import {AuthFlow} from "."
import {SelectInput, TextInput} from "~/components/inputs"

interface NewAuthPageProps {
  setFlow: (flow: AuthFlow) => void;
}

interface FormValues {
  name: string;
  business: string;
  type: string;
  options: string;
}

export const NewAuthPage: React.FC<NewAuthPageProps> = ({ setFlow }) => {
  const [value, setValue] = useState<FormValues>({
    name: '',
    business: '',
    type: '',
    options: '',
  });
  console.log(value)

  return (
    <div className="h-screen w-full flex items-center">
      <div className="flex flex-col items-center gap-[48px] w-full">
        <div className="flex flex-col items-center gap-[16px]">
          <h1 className="text-[#1D1D1F] text-[64px] leading-[72px] font-[600] tracking-[-1.44px]">Hi human 👋</h1>
          <p className="text-[#494949] text-[19px] leading-[24px] text-center">
            You’re new here! Let’s start with your name.
          </p>
        </div>
        <div className="flex flex-col items-start gap-[16px] max-w-[430px]">
          <TextInput
            label="Your Full name"
            name="full-name"
            type="text"
            value={value.name}
            required={true}
            setValue={(value: string) =>
              setValue((prevValue) => ({
                ...prevValue,
                name: value,
              }))
            }
            actionButton={false}
            disabled={false}
            haveError={() => false}
            className="w-[425px] rounded-[13px]"
          />
          {value.name !== '' && (
            <div className="flex content-center items-center gap-[8px]">
              <p className="text-[19px] leading-[14px] text-[#1D1D1F]">I</p>
              <SelectInput
                label="Own a business"
                name="business"
                value={value.business}
                required={true}
                setValue={(value: string) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    business: value,
                  }))
                }
                actionButton={false}
                disabled={false}
                haveError={() => false}
                className="w-full rounded-[13px]"
                options={['work for myself', 'work at a company']}
              />
              <p className="text-[19px] leading-[14px] text-[#1D1D1F]">In</p>
              <SelectInput
                label="Ecommerce"
                name="ecommerce"
                value={value.type}
                required={true}
                setValue={(value: string) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    type: value,
                  }))
                }
                actionButton={false}
                disabled={false}
                haveError={() => false}
                className="w-full rounded-[13px]"
                options={['work for myself', 'work at a company']}
              />
            </div>
          )}
          {value.name !== '' && (
            <div className="flex content-center items-center gap-[8px]">
              <p className="text-[19px] leading-[14px] text-[#1D1D1F]">I need a cloned human to</p>
              <SelectInput
                label="Select options"
                name="select-options"
                value={value.options}
                required={true}
                setValue={(value: string) =>
                  setValue((prevValue) => ({
                    ...prevValue,
                    options: value,
                  }))
                }
                actionButton={false}
                disabled={false}
                haveError={() => false}
                className="w-[195px] rounded-[13px]"
                options={['work for myself', 'work at a company']}
              />
            </div>
          )}
        </div>
        {value.name !== '' && (
          <div className="w-[185px] bg-[#1D1D1F] p-[16px] rounded-[16px] flex items-center text-white justify-center text-center text-[15px] font-[500]">
            <button onClick={() => setFlow('welcome')}>Continue -&gt;</button>
          </div>
        )}
      </div>
    </div>
  );
};
