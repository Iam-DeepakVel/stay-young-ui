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
      <div className=" flex items-center">
        <input
          {...register(name, registerOptions)}
          {...props}
          className="form-input"
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
          className="mt-1 cursor-pointer border-b border-gray-300 py-2"
          onClick={() => setVisiblePassword(!visiblePassword)}
        />
      </div>
      <span className="text-xs text-red-500">{error?.message}</span>
    </div>
  );
};

export default PasswordInputField;
