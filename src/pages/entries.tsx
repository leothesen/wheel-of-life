import { type NextPage } from "next";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import { RadarGraph } from "../components/radarChart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import { EntriesTable } from "../components/entries/table";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Loading } from "../components/loading";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [userValues, setUserValues] = useState<string[]>([]);
  const {
    data: userValuesResult,
    isLoading: isUserValuesLoading,
    isInitialLoading,
  } = api.value.getUserValues.useQuery();
  const [isEntryLoading, setIsEntryLoading] = useState(false);

  const { mutate } = api.entry.create.useMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isUserValuesLoading && userValuesResult) {
      const mappedValues = userValuesResult.map((value) => value.value);
      setUserValues(mappedValues);
    }

    // TODO: Redirect to /values if user has no values
  }, [isUserValuesLoading]);

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "ratings", // unique name for your Field Array
    }
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (entry) => {
    setIsEntryLoading(true);
    console.log("entry loading", isEntryLoading);
    // Here, call the mutation to create a new entry using your tRPC API
    // After successful creation, close the modal and optionally refresh your data
    // You'll need to properly setup and call your api.entry.create mutation here
    // await mutate(values);
    console.log(entry);
    // set buttons to loading
    mutate(
      {
        entry: {
          title: entry.title,
          notes: entry.notes,
          ratings: entry.ratings,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setIsEntryLoading(false);
          console.log("entry loading", isEntryLoading);
          closeModal();
        },
        onError: (error) => {
          setIsEntryLoading(false);
          console.log(error);
        },
      }
    );
  };

  return (
    <>
      <Layout>
        {isUserValuesLoading ? ( // Render skeleton loading when isLoading is true
          <Loading />
        ) : (
          <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <RadarGraph size={700} />
              <button className="btn-primary btn" onClick={openModal}>
                Add entry
              </button>
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="modal modal-open">
                    <div className="modal-box">
                      <h2 className="text-xl">Add Entry</h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4 flex flex-col items-start justify-center">
                          <label className="mb-2">Title:</label>
                          <input
                            className="input-bordered input"
                            {...register("title", { required: "Required" })}
                          />
                          {errors.title && (
                            <span className="mt-1 text-red-500">
                              {errors.title.message as React.ReactNode}
                            </span>
                          )}
                        </div>
                        <div className="mt-4 flex flex-col items-start justify-center">
                          <label className="mb-2">Notes:</label>
                          <input
                            className="input-bordered input"
                            {...register("notes", { required: "Required" })}
                          />
                          {errors.notes && (
                            <span className="mt-1 text-red-500">
                              {errors.notes.message as React.ReactNode}
                            </span>
                          )}
                        </div>
                        {/* User values */}
                        <div className="flex flex-col items-start justify-center">
                          {userValues &&
                            userValues.values.map((value, index) => (
                              <div key={index} className="mt-4">
                                <label className="mb-2">{value}:</label>
                                <input
                                  className="input-bordered input"
                                  key={index}
                                  {...register(`ratings.${index}.${value}`, {
                                    required: "Required",
                                  })}
                                />
                                {/* {errors && (
                                  <span className="mt-1 text-red-500">
                                    {errors.ratings.message as React.ReactNode}
                                  </span>
                                )} */}
                              </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            type="submit"
                            disabled={isEntryLoading}
                            className={`btn-primary btn ${
                              isEntryLoading ? "animate-pulse" : ""
                            }`}
                          >
                            Submit
                          </button>
                          <button
                            onClick={closeModal}
                            disabled={isEntryLoading}
                            className={`btn-secondary btn ${
                              isEntryLoading ? "animate-pulse" : ""
                            }`}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              {/* <EntriesTable data={data} captions={captions} /> */}
            </div>
          </main>
        )}
      </Layout>
    </>
  );
};

export default Home;
