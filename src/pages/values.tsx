import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import { api } from "../utils/api";

const Values: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<string[]>([]);

  const { mutate } = api.value.create.useMutation();

  useEffect(() => {
    setValues(["", "", "", "", ""]); // Set initial values with 5 empty strings
  }, []);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      mutate({ values }, {
        onSuccess: (data) => {
          setValues(data.values);
          setIsLoading(false);
        }
      })
    } catch (error) {
      // Handle any error that occurred during the API request
    }
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  const handleAddInput = () => {
    setValues([...values, ""]);
  };

  return (
    <>
      <Head>
        <title>Wheel of Life</title>
        <meta name="Wheel of Life app" content="For tracking and reflecting" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#000000] to-[#000000]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <UserButton afterSignOutUrl="/sign-in" />
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Wheel <span className="text-[#66bcee]">of</span> Life
          </h1>

          <div className="flex flex-col items-center gap-4">
            {values.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(index, e.target.value)}
                maxLength={25}
                className={`input input-bordered ${value.length > 25 ? "border-red-500" : ""}`}
                style={{ width: "200%" }}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 w-full">
            <button
              className={`btn btn-primary ${isLoading ? "animate-pulse" : ""}`}
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </button>

            <button
              className="btn btn-secondary"
              onClick={handleAddInput}
              disabled={isLoading}
            >
              Add Input
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Values;
