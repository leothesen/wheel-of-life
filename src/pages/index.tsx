import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Head from "next/head";
import Link from "next/link";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import { Entries } from "../components/entries";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser(); // Fetch the user object from Clerk

  const [data, setData] = useState([
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
      meta: { color: "green" },
      date: new Date(),
    },
  ]);

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

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate new random values for the data array
      const newData = data.map((item) => {
        const newDataItem = { ...item };
        for (const key in newDataItem.data) {
          const keyOfDataType = key as keyof typeof newDataItem.data;
          newDataItem.data[keyOfDataType] = Math.random();
        }
        // Generate a random color in the format "#58FCEC"
        newDataItem.meta.color = getRandomColor();
        return newDataItem;
      });
      setData(newData);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
}, [data]);

  // Function to generate a random color in the format "#58FCEC"
  // Function to generate a random color from a predefined list
  const getRandomColor = () => {
    const colors = ["red", "green", "yellow", "blue", "orange"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex] || "blue";
  };

  return (
    <>
      <Layout>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <RadarChart captions={captions} data={data} size={200} />
            {!user ? (
              <div className="hover:bg-primary-dark rounded-md bg-primary px-4 py-2 text-white transition-all duration-200 ease-in-out">
                <SignInButton
                  afterSignInUrl="/entries"
                  afterSignUpUrl="/values"
                />
              </div>
            ) : null}
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
