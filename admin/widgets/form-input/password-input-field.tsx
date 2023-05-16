import { useState } from "react";
import { InputFieldProps } from "./input-field";
import Image from "next/image";

const PasswordInputField = ({
  name,
  label,
  register,
  registerOptions,
  error,
  ...props
}: InputFieldProps) => {
  const [visiblePassword, setVisiblePassword] = useState(false);
  return (
    <div>
      <label htmlFor={name} className="form-label text-sec-text text-b4 mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          {...register(name, registerOptions)}
          {...props}
          className={
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 placeholder:text-sm"
          }
          type={visiblePassword ? "text" : "password"}
        />
        <Image
          width={20}
          height={20}
          src={`${
            visiblePassword
              ? "/assets/icons/eye.svg"
              : "/assets/icons/eye-slash.svg"
          }`}
          alt="eye"
          className="absolute right-2  cursor-pointer bottom-[0.5px] my-2"
          onClick={() => setVisiblePassword(!visiblePassword)}
        />
      </div>
      <span className="text-xs text-red-500">{error?.message}</span>
    </div>
  );
};

export default PasswordInputField;
