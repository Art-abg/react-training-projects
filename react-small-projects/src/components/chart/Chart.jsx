// @react-small-projects/src/components/chart/Chart.jsx
import React, { useRef, useEffect } from "react";
import { createChart } from "lightweight-charts";
import { lineChartData, candlestickChartData } from "./data";

const ChartComponent = ({ chartType }) => {
  const chartContainerRef = useRef();
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current && !chartRef.current) {
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight
      });
    }

    const chart = chartRef.current;

    // Remove the previous series if it exists and is defined
    if (seriesRef.current) {
      chart.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    // Add the appropriate series based on the chartType prop
    if (chartType === "line") {
      const lineSeries = chart.addLineSeries();
      lineSeries.setData(lineChartData);
      seriesRef.current = lineSeries;
    } else if (chartType === "candle") {
      const candleSeries = chart.addCandlestickSeries();
      candleSeries.setData(candlestickChartData);
      seriesRef.current = candleSeries;
    }

    const resizeHandler = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight
        });
      }
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (chart && seriesRef.current) {
        chart.removeSeries(seriesRef.current);
        seriesRef.current = null;
      }
      if (chart) {
        chart.remove();
        chartRef.current = null;
      }
    };
  }, [chartType]);

  return (
    <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />
  );
};

export default ChartComponent;
