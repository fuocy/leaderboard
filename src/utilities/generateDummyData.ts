import { Metric } from "../store";

const generateRandomText = () => {
  const words = ["alpha", "bravo", "charlie", "delta", "echo", "foxtrot"];
  return words[Math.floor(Math.random() * words.length)];
};
const generateRandomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateDummyData = (metrics: Metric[], numberOfEntries = 10) => {
  const data = [];
  for (let i = 0; i < numberOfEntries; i++) {
    const entry: Record<string, string | number> = {};
    metrics.forEach((metric) => {
      if (metric.type === "text") {
        entry[metric.name] = generateRandomText();
      } else if (metric.type === "number") {
        entry[metric.name] = generateRandomNumber();
      }
    });
    data.push(entry);
  }
  return data;
};
