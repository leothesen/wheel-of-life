import { Entries, EntryRatings, UserValues } from "@prisma/client";
import { Captions, Data } from "./wheel.interface";

export const mapWheelData = (
  values: UserValues[],
  entries: (Entries & {
    ratings: EntryRatings[];
  })[]
) => {
  

  const wheelRatings = entries.map((entry) => {
    let data: Data = {};

    entry.ratings.forEach((rating) => {
      const value = values.find((value) => value.id === rating.userValueId);
      if (value) {
        data[value.value] = rating.rating / 10;
      }
    });

    return {
      data,
      meta: { color: "blue" },
      date: entry.createdAt,
    };
  });

  return wheelRatings;
};

export const mapWheelCaptions = (values: UserValues[]) => {
  const captions: Captions = {};

  values.forEach((value) => {
    captions[value.value] = value.value;
  });

  return captions;
};
