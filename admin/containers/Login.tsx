import InputField from "@/admin/widgets/form-input/input-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInputField from "@/admin/widgets/form-input/password-input-field";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must have more than 6 characters"),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const Login = () => {
  const [error, setError] = useState<string | undefined>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormSchemaType> = async ({
    email,
    password,
  }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STAY_YOUNG_API}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const { access_token } = data;

        Cookies.set("access_token", access_token);
        router.push("/admin/products");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-16 w-auto"
          src="/assets/images/logo-img.png"
          alt="stay young"
          width={500}
          height={500}
        />
        <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-2">
            <InputField
              name="email"
              type="text"
              label="Email address"
              register={register}
              placeholder="Enter the email"
              error={errors.email}
            />
          </div>

          <div className="mt-2">
            <PasswordInputField
              name="password"
              type="password"
              label="Password"
              register={register}
              placeholder="Enter the password"
              error={errors.password}
            />
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-transparent hover:text-black hover:border hover:border-black "
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
