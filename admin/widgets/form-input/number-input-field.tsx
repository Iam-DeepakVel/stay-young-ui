import { FieldError, UseFormRegister } from "react-hook-form";

export interface InputFieldProps {
  name: string;
  label?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  className?: string;
  [x: string]: any;
}

const NumberInputField = ({
  name,
  label,
  register,
  error,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...register(name, {
          setValueAs: (v) => (v === "" ? undefined : parseInt(v, 10)),
        })}
        {...props}
        className={`${className ? className : "form-input"}`}
      />
      <span className="form-error-text mt-1">{error?.message}</span>
    </div>
  );
};

export default NumberInputField;
