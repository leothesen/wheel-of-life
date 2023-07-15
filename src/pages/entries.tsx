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
import { useForm } from "react-hook-form";
import { Loading } from "../components/loading";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const { data: userValues, isLoading } = api.value.getUserValues.useQuery();

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

  const onSubmit = async (values) => {
    // Here, call the mutation to create a new entry using your tRPC API
    // After successful creation, close the modal and optionally refresh your data
    // You'll need to properly setup and call your api.entry.create mutation here
    closeModal();
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
        {isLoading ? ( // Render skeleton loading when isLoading is true
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
                        <label>
                          Title:
                          <input
                            className="input-bordered input"
                            {...register("title", { required: "Required" })}
                          />
                        </label>
                        {errors.title && errors.title.message}
                        <label>
                          Notes:
                          <input
                            className="input-bordered input"
                            {...register("notes", { required: "Required" })}
                          />
                        </label>
                        {errors.notes && errors.notes.message}
                        {/* ... add more fields as needed ... */}
                        <div className="modal-action">
                          <button type="submit" className="btn">
                            Submit
                          </button>
                          <button onClick={closeModal} className="btn">
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
