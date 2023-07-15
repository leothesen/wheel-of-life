import { type NextPage } from "next";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import { Entries } from "../components/entries/table";
import Layout from "../components/layout";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Loading } from "../components/loading";

const Home: NextPage = () => {
  const [isEntryLoading, setIsEntryLoading] = useState(false);
  const { data: userValues, isLoading: isValuesLoading } =
    api.value.getUserValues.useQuery();

  const { mutate } = api.entry.create.useMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
          ratings: [
            {
              value: "test",
              rating: 8,
            },
          ],
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

  const data = [
    {
      data: {
        health: 0.9,
        sleep: 0.2,
        food: 0.2,
        emotionalIntelligence: 0.6,
        personalDevelopment: 0.9,
        work: 0.2,
        relationships: 0.4,
        nature: 0.5,
        exercise: 0.2,
      },
      meta: { color: "blue" },
      date: new Date(),
    },
    {
      data: {
        health: 0.9,
        sleep: 0.2,
        food: 0.2,
        emotionalIntelligence: 0.6,
        personalDevelopment: 0.9,
        work: 0.2,
        relationships: 0.4,
        nature: 0.5,
        exercise: 0.2,
      },
      meta: { color: "red" },
      date: new Date(),
    },
  ];

  const captions = {
    health: "Health",
    sleep: "Sleep",
    food: "Food",
    emotionalIntelligence: "Emotional intelligence",
    personalDevelopment: "Personal development",
    work: "Work",
    relationships: "Relationships",
    nature: "Nature",
    exercise: "Exercise",
  };

  return (
    <>
      <Layout>
        {isValuesLoading ? ( // Render skeleton loading when isLoading is true
          <Loading />
        ) : (
          <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#000000] to-[#000000]">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
              <RadarChart captions={captions} data={data} size={700} />
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
                        <div className="flex flex-col items-start justify-center">
                          {userValues && userValues.values.map((value, index) => (
                            <div key={index} className="mt-4">
                              <label className="mb-2">{value}:</label>
                              <input
                                className="input-bordered input"
                                {...register(value, { required: "Required" })}
                              />
                              {errors[value] && (
                                <span className="mt-1 text-red-500">
                                  { errors[value].message as React.ReactNode}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                        {/* ... add more fields as needed ... */}
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
              <Entries data={data} captions={captions} />
            </div>
          </main>
        )}
      </Layout>
    </>
  );
};

export default Home;
