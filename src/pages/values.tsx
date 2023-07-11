import React, { useState } from "react";
import { type NextPage } from "next";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "../utils/api";

const Values: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<string[]>(); // Add values state

  // const { mutate, isLoading } = api.games.create.useMutation();
  const { mutate } = api.value.create.useMutation();

  const handleClick = async () => {
    setIsLoading(true);

    try {
      console.log("hello") 
      // const result = await api.value.getAll.useQuery(); // Fetch all values

      mutate({ values: ["test"]}, {
        onSuccess: (data) => {
          console.log(data)
          setValues(data.values);
          setIsLoading(false);
        }
      })

    } catch (error) {
      // Handle any error that occurred during the API request
    }

    
  };

  return (
    <>
      <Head>
        <title>Wheel of Life</title>
        <meta name="Wheel of Life app" content="For tracking and reflecting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#000000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <UserButton afterSignOutUrl="/sign-in" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Wheel <span className="text-[#66bcee]">of</span> Life
          </h1>

          <button
            className={`btn btn-primary ${isLoading ? "animate-pulse" : ""}`}
            onClick={handleClick}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Make API Request"}
          </button>

          {/* Render the values in a text field */}
          <div className="mt-4">
            { JSON.stringify(values) }
          </div>
        </div>
      </main>
    </>
  );
};

export default Values;
