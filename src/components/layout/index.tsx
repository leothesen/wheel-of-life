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
      <header className="flex items-center bg-neutral px-4 py-2">
        <div className="flex flex-grow items-center">
          <h1 className="mx-auto text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            <span className="text-[hsl(var(--sf))]">Wheel </span>
            <span className="text-[hsl(var(--pf))]">of</span>
            <span className="text-[hsl(var(--af))]"> Life</span>
          </h1>
        </div>
        <div className="ml-auto">
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <main>{children}</main>
    </>
  );
};

export default Layout;
