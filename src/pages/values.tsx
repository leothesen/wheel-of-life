import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { api } from "../utils/api";
import Layout from "../components/layout";
import { UserValues } from "@prisma/client";

const Values: NextPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isValuesLoading, setIsValuesLoading] = useState(true);
  const [values, setValues] = useState<string[]>(["", "", "", "", ""]);
  const [userValues, setUserValues] = useState<string[]>([]);

  const [submitError, setSubmitError] = useState<string | null>(null);

  
  const { mutate } = api.value.create.useMutation();
  const { data: userValueData, isLoading: isUserValuesLoading } =
  api.value.getUserValues.useQuery();
  
  useEffect(() => {
    if (userValueData) {
      setUserValues(userValueData.map((userValue: UserValues) => userValue.value));
      console.log(userValueData)
    }
  }, [isUserValuesLoading]);

  useEffect(() => {
    if (!isUserValuesLoading && userValues) {
      console.log(userValues);
      if (userValues.length === 0) {
        setValues(["", "", "", "", ""]);
      } else {
        setValues(userValues);
      }
      setIsValuesLoading(false);
    }
    if (!isUserValuesLoading && !userValues) {
      setValues(["", "", "", "", ""]);
      setIsValuesLoading(false);
    }
  }, [userValues, isUserValuesLoading]);

  const handleClick = async () => {
    setIsSubmitLoading(true);

    try {
      mutate(
        { values },
        {
          onSuccess: (data) => {
            setValues(data);
            setSubmitError(null);
            setIsSubmitLoading(false);
          },
          onError: (error) => {
            console.log(error);
            setSubmitError("Unable to submit values.");
            setIsSubmitLoading(false);
          }
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

            {/* An error warning in red text */}
            {submitError && (
              <div className="text-red-500 text-center">{submitError}</div>
            )}

            <div className="flex w-full justify-center gap-4">
              <button
                className={`btn-primary btn ${
                  isSubmitLoading ? "animate-pulse" : ""
                }`}
                onClick={handleClick}
                disabled={isSubmitLoading}
              >
                {isSubmitLoading ? "Loading..." : "Submit"}
              </button>

              <button
                className="btn-secondary btn"
                onClick={handleAddInput}
                disabled={isSubmitLoading}
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
