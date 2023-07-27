import { useEffect, useState } from "react";
import RadarChart from "react-svg-radar-chart";

const mockData = [
  {
    data: {
      health: 0.9,
      sleep: 0.2,
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
      work: 0.2,
      relationships: 0.4,
      nature: 0.5,
      exercise: 0.2,
    },
    meta: { color: "red" },
    date: new Date(),
  },
];

const mockValues = {
  health: "Health",
  sleep: "Sleep",
  work: "Work",
  relationships: "Relationships",
  nature: "Nature",
  exercise: "Exercise",
};

export interface ChartData {
    data: {
        [value: string]: number;
    };
    meta: { color: string };
}

interface Props {
  data?: ChartData[];
  values?: {
    [key: string]: string;
  };
  size?: number;
}

export const RadarGraph: React.FC<Props> = ({
  data = mockData,
  values = mockValues,
  size = 700,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Calculate the size based on breakpoint
  if (screenWidth < 480) {
    size = 300;
  } else if (screenWidth < 768) {
    size = 500;
  } else if (screenWidth < 1024) {
    size = 700;
  } // Add more breakpoints as needed

  return <RadarChart captions={values} data={data} size={size} />;
};
