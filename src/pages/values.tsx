import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { UserButton } from "@clerk/nextjs";
import { api } from "../utils/api";
import Layout from "../components/layout";

const Values: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const [isValuesLoading, setIsValuesLoading] = useState(true);

  const { mutate } = api.value.create.useMutation();
  const { data: userValues, isLoading: isUserValuesLoading } =
    api.value.getUserValues.useQuery();

  useEffect(() => {
    setValues(["", "", "", "", ""]); // Set initial values with 5 empty strings
  }, []);

  useEffect(() => {
    if (!isUserValuesLoading && userValues) {
      console.log(userValues, "userValues");
      if (userValues.values.length === 0) {
        setValues(["", "", "", "", ""]);
      } else {
        setValues(userValues.values);
      }
      setIsValuesLoading(false);
    }
    if (!isUserValuesLoading && !userValues) {
      setValues(["", "", "", "", ""]);
      setIsValuesLoading(false);
    }
  }, [userValues, isUserValuesLoading]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      mutate(
        { values },
        {
          onSuccess: (data) => {
            setValues(data.values);
            setIsLoading(false);
          },
        }
      );
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
      <Layout>
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#000000] to-[#000000]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
            <div className="flex flex-col items-center gap-4">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex justify-center"
                  style={{ width: "200%" }}
                >
                  {isUserValuesLoading || isValuesLoading ? (
                    <input
                      className="input-bordered input animate-pulse"
                      style={{ width: "100%" }}
                    ></input>
                  ) : (
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      maxLength={25}
                      className={`input-bordered input ${
                        value.length > 24 ? "border-red-500" : ""
                      }`}
                      style={{ width: "100%" }}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex w-full justify-center gap-4">
              <button
                className={`btn-primary btn ${
                  isLoading ? "animate-pulse" : ""
                }`}
                onClick={handleClick}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>

              <button
                className="btn-secondary btn"
                onClick={handleAddInput}
                disabled={isLoading}
              >
                Add Input
              </button>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Values;
