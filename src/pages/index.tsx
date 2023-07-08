import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

import { api } from "../utils/api";
import { Entries } from "../components/entries";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const data = [
    {
      data: {
        battery: 0.7,
        design: 0.8,
        useful: 0.9,
        speed: 0.67,
        weight: 0.8,
      },
      meta: { color: "blue" },
    },
    {
      data: {
        battery: 0.6,
        design: 0.85,
        useful: 0.5,
        speed: 0.6,
        weight: 0.7,
      },
      meta: { color: "red" },
    },
  ];

  const captions = {
    // columns
    battery: "Battery Capacity",
    design: "Design",
    useful: "Usefulness",
    speed: "Speed",
    weight: "Weight",
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Wheel <span className="text-[hsl(280,100%,70%)]">of</span> Life
          </h1>
          <RadarChart captions={captions} data={data} size={450} />
          <Entries />
        </div>
      </main>
    </>
  );
};

export default Home;