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
import { Entries, EntryRatings, UserValues } from "@prisma/client";
import { Captions, Data } from "../server/domains/wheel/wheel.interface";

const Home: NextPage = () => {
  /** Functional components */
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    reset,
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

  /** User values */
  const { data: userValues, isLoading: isUserValuesLoading } =
    api.value.getUserValues.useQuery();

  /** User Entry */
  const [isEntryLoading, setIsEntryLoading] = useState(false);
  const { mutate } = api.entry.create.useMutation();

  /** Wheel */
  const [wheel, setWheel] = useState<{
    data: {
      data: Data,
      meta: { color: string };
      date: Date;
    }[]
    captions: Captions;
}>(null as any);
  const { data: wheelResult, isLoading: isWheelLoading, refetch: refetchWheel } = api.wheel.getWheel.useQuery();

  useEffect(() => {
    if (!isWheelLoading && wheelResult) {
      if (wheelResult) setWheel(wheelResult);
    }
  }
  , [isWheelLoading]);

  /** Handle form submission */
  const onSubmit: SubmitHandler<FieldValues> = async (entry) => {
    setIsEntryLoading(true);
    mutate(
      {
        entry: {
          title: entry.title,
          notes: entry.notes,
          ratings: entry.ratings,
        },
      },
      {
        onSuccess: async (data) => {
          await refetchWheel();
          setIsEntryLoading(false);
          closeModal();
          reset();
        },
        onError: (error) => {
          setIsEntryLoading(false);
        },
      }
    );
  };

  return (
    <>
      <Layout>
        {isUserValuesLoading || isWheelLoading ? ( // Render skeleton loading when isLoading is true
          <Loading />
        ) : (
          <main className="flex min-h-screen flex-col items-top items-center justify-center">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <RadarGraph size={700} data={wheelResult?.data} values={wheelResult?.captions} />
              <button className="btn-primary btn" onClick={openModal}>
                Add entry
              </button>
              {/* Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="modal-open modal">
                    <div className="modal-box">
                      <h2 className="text-xl">Add Entry</h2>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4 flex flex-col justify-center">
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
                        <div className="mt-4 flex flex-col justify-center">
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
                        <div className="flex flex-col justify-center">
                          {userValues &&
                            userValues.map((value, index) => (
                              <div key={index} className="mt-4">
                                <label className="mb-2">{value}:</label>
                                <input
                                  type="range"
                                  min={0}
                                  max="10"
                                  className="range range-primary"
                                  key={index}
                                  {...register(`ratings.${index}.${value}`, {
                                    required: "Required",
                                  })}
                                />
                              </div>
                            ))}
                        </div>
                        <div className="join mt-4 flex justify-center">
                          <button
                            type="submit"
                            disabled={isEntryLoading}
                            className={`btn-primary join-item btn ${
                              isEntryLoading ? "animate-pulse" : ""
                            }`}
                          >
                            Submit
                          </button>
                          <button
                            onClick={closeModal}
                            disabled={isEntryLoading}
                            className={`btn-secondary join-item btn ${
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
