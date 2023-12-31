import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { RadarGraph } from "../components/radarChart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import Layout from "../components/layout";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { user } = useUser(); // Fetch the user object from Clerk

  if (user?.id) {
    // If the user is signed in, route to /entries page
    router.push("/entries");
  }


  const [data, setData] = useState([
    {
      data: {
        your: 0.9,
        whole: 0.2,
        life: 0.2,
        in: 0.4,
        a: 0.5,
        circle: 0.2,
      },
      meta: { color: "blue" },
      date: new Date(),
    },
    {
      data: {
        your: 0.9,
        whole: 0.2,
        life: 0.2,
        in: 0.4,
        a: 0.5,
        circle: 0.2,
      },
      meta: { color: "green" },
      date: new Date(),
    },
  ]);

  const captions = {
    your: "your",
    whole: "whole",
    life: "life",
    in: "in",
    a: "a",
    circle: "circle",
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
            <RadarGraph values={captions} data={data} />
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
