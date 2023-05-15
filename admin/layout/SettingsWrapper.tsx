import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

const settingsLinks = [
  {
    name: "Reset Password",
    path: "/admin/settings/reset-password",
  },
];

type SettingsProps = {
  children?: ReactNode;
};

function SettingsWrapper({ children }: SettingsProps) {
  const { asPath } = useRouter();
  return (
    <div className="bg-white flex flex-col mx-4 sm:flex-row lg:mx-auto items-stretch max-w-5xl  my-6 drop-shadow-md min-h-[500px] rounded-xl">
      {/* SideSection */}
      <div className="w-64 border-r border-gray-200">
        <h2 className="font-bold pl-4 pt-4 text-lg font-raleway 2xl:text-2xl">
          Account Settings
        </h2>
        {/* Links Container */}
        <div className="w-full flex flex-col mt-6">
          {/* Links */}
          {settingsLinks?.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`${
                asPath.includes(link.path)
                  ? "bg-[#bd5181]/[0.1] pl-3 border-l-4 border-[#bd5181]"
                  : " pl-4"
              } text-md 2xl:text-lg h-12 items-center flex`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
      {/*Settings Components */}
      <div className="flex-1 min-h-full p-4">{children}</div>
    </div>
  );
}

export default SettingsWrapper;
