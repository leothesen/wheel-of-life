import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { api } from "../utils/api";
import Layout from "../components/layout";
import { UserValues } from "@prisma/client";
import { useRouter } from "next/router";
import { Loading } from "../components/loading";

const Values: NextPage = () => {
  const router = useRouter();
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
      setUserValues(
        userValueData.map((userValue: UserValues) => userValue.value)
      );
      console.log(userValueData);
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
            router.push("/entries");
          },
          onError: (error) => {
            console.log(error);
            setSubmitError("Unable to submit values.");
            setIsSubmitLoading(false);
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
        {isValuesLoading ? (
          <Loading />
        ) : (
          <main className="items-top flex min-h-screen justify-center">
            <div className="container flex flex-col items-center gap-12 px-4 py-16">
              <article className="prose text-center">
                <h1>What are your values?</h1>
                <p>
                  Your values are the things that you believe are important in
                  the way you live your life. They help guide your reactions and
                  inform your decisions.
                </p>
                <p>
                  <a
                    className="link-secondary link "
                    href="https://www.mindtools.com/a5eygum/what-are-your-values"
                    target="_blank"
                  >
                    Use this link
                  </a>{" "}
                  to learn more about values and how to identify your own.
                </p>
              </article>
              <div className="flex flex-col items-center gap-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex justify-center"
                    style={{ width: "200%" }}
                  >
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
                  </div>
                ))}
              </div>
              {/* An error warning in red text */}
              {submitError && (
                <div className="text-center text-red-500">{submitError}</div>
              )}
              <div className="join flex w-full justify-center">
                <button
                  className={`btn-primary join-item btn ${
                    isSubmitLoading ? "animate-pulse" : ""
                  }`}
                  onClick={handleClick}
                  disabled={isSubmitLoading}
                >
                  {isSubmitLoading ? "Loading..." : "Submit"}
                </button>

                <button
                  className="btn-secondary join-item btn"
                  onClick={handleAddInput}
                  disabled={isSubmitLoading}
                >
                  Add Input
                </button>
              </div>
            </div>
          </main>
        )}
      </Layout>
    </>
  );
};

export default Values;
