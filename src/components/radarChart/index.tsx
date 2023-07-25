import RadarChart from "react-svg-radar-chart";

const mockData = [
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

const mockValues = {
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
  return <RadarChart captions={values} data={data} size={size} />;
};
