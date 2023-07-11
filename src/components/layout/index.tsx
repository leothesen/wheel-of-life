import React from "react";
import { UserButton } from "@clerk/nextjs";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="flex justify-between items-center px-4 py-2 bg-gray-200">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Wheel <span className="text-[#66bcee]">of</span> Life
          </h1>
        <UserButton afterSignOutUrl="/sign-in" />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
