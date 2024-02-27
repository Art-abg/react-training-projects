// @react-small-projects/src/components/chart/data.js

// Expanded line chart data
export const lineChartData = [
  { time: "2019-04-11", value: 80.01 },
  { time: "2019-04-12", value: 96.63 },
  { time: "2019-04-13", value: 76.64 },
  { time: "2019-04-14", value: 81.89 },
  { time: "2019-04-15", value: 74.22 },
  { time: "2019-04-16", value: 82.3 },
  { time: "2019-04-17", value: 90.12 },
  { time: "2019-04-18", value: 93.2 },
  { time: "2019-04-19", value: 87.9 },
  { time: "2019-04-20", value: 89.5 },
  { time: "2019-04-21", value: 92.1 },
  { time: "2019-04-22", value: 94.1 },
  { time: "2019-04-23", value: 94.4 },
  { time: "2019-04-24", value: 94.8 },
  { time: "2019-04-25", value: 95.2 },
  { time: "2019-04-26", value: 95.8 },
  { time: "2019-04-27", value: 96.3 },
  { time: "2019-04-28", value: 96.8 },
  { time: "2019-04-29", value: 97.2 },
  { time: "2019-04-30", value: 97.6 },
  { time: "2019-05-01", value: 98.1 },
  { time: "2019-05-02", value: 98.5 },
  { time: "2019-05-03", value: 98.9 },
  { time: "2019-05-04", value: 99.3 },
  { time: "2019-05-05", value: 99.7 },
  { time: "2019-05-06", value: 100.1 },
  { time: "2019-05-07", value: 100.5 },
  { time: "2019-05-08", value: 100.9 },
  { time: "2019-05-09", value: 101.3 },
  { time: "2019-05-10", value: 101.7 },
  { time: "2019-05-11", value: 102.1 },
  { time: "2019-05-12", value: 104.5 },
  { time: "2019-05-13", value: 90.1 },
  { time: "2019-05-14", value: 70.1 },
  { time: "2019-05-15", value: 60.1 },
  { time: "2019-05-16", value: 75.1 },
  { time: "2019-05-17", value: 80.1 },
  { time: "2019-05-18", value: 85.1 },
  { time: "2019-05-19", value: 90.1 }
];

const randomize = (base, range) => base + (Math.random() - 0.5) * range;
// Expanded candlestick chart data
export const candlestickChartData = lineChartData.map((dataPoint) => {
  const close = dataPoint.value;
  const open = randomize(close, 10); // Random open price within $10 of close
  const high = Math.max(open, close, randomize(close, 15)); // High must be >= open and close
  const low = Math.min(open, close, randomize(close, 15)); // Low must be <= open and close
  return {
    time: dataPoint.time,
    open,
    high,
    low,
    close
  };
});
