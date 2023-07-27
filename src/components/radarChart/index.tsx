import { useEffect, useState } from "react";
import RadarChart from "react-svg-radar-chart";

const mockData = [
  {
    data: {
      something: 0,
      has: 0.1,
      gone: 0.2,
      wrong: 0.3,
      whoops: 0.4,
      sorry: 0.5,
    },
    meta: { color: "blue" },
    date: new Date(),
  },
  {
    data: {
      something: 0.9,
      has: 0.6,
      gone: 0.4,
      wrong: 0.2,
      whoops: 0.1,
      sorry: 0.0,
    },
    meta: { color: "red" },
    date: new Date(),
  },
];

const mockValues = {
  something: "something",
  has: "has",
  gone: "gone",
  wrong: "wrong",
  whoops: "whoops",
  sorry: "sorry",
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

const getInitialScreenWidth = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth;
  } else {
    return 1024; // Default value when window is not available (server-side)
  }
};

export const RadarGraph: React.FC<Props> = ({
  data = mockData,
  values = mockValues,
  size = 600,
}) => {
  const [screenWidth, setScreenWidth] = useState(getInitialScreenWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Calculate the size based on breakpoint
  if (screenWidth < 480) {
    size = 300;
  } else if (screenWidth < 768) {
    size = 480;
  } else if (screenWidth < 1024) {
    size = 600;
  } // Add more breakpoints as needed

  return <RadarChart captions={values} data={data} size={size} />;
};
