import InputField from "@/admin/widgets/form-input/input-field";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordInputField from "@/admin/widgets/form-input/password-input-field";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useAuth } from "@/admin/hooks/useAuth";
import { Loading } from "@nextui-org/react";

const loginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormSchemaType = z.infer<typeof loginFormSchema>;

const Login = () => {
  const { user, loading } = useAuth();

  const [error, setError] = useState<string | null>(null);
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
      const loginToast = toast.loading("Logging in...");
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

        Cookies.set("access_token", access_token, { expires: 1 });
        toast.success("Login Successfull", {
          id: loginToast,
        });
        router.push("/admin/products");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message, {
          id: loginToast,
        });
      }
    } catch (error) {
      setError("An error occurred. Please try again later");
    }
  };

  useEffect(() => {
    if (!loading && user) {
      router.push("/admin/products");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 md:py-20">
      {error && <p className="text-md text-red-500 mb-4">{error}</p>}
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
              className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className="flex w-full justify-center cursor-pointer rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-transparent hover:text-black hover:border hover:border-black "
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
