import React from "react";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Wheel of Life</title>
        <meta name="Wheel of Life app" content="For tracking and reflecting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex items-center justify-between bg-gray-200 px-4 py-2">
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
