// RenkoChart.jsx
import React, { useState, useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { parseCSV } from "./ParseCSV"; // Make sure the path is correct
import { calculateRenkoBricks } from "./calculations/calculateRenkoBricks"; // Make sure the path is correct
import Modal from "../modal/Modal";
import JSZip from "jszip";
const RenkoChart = ({ date, symbol }) => {
  const [renkoData, setRenkoData] = useState(null);
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const brickSize = 1.0;
  const convertToTimestamp = (dateString) => {
    const date = new Date(dateString);
    return date.getTime();
  };
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchBinanceData = async (selectedDate, symbol) => {
      const baseUrl = `https://data.binance.vision/data/futures/um/daily/aggTrades/${symbol}`;
      const url = `${baseUrl}/${symbol}-aggTrades-${date}.zip`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const zipData = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(zipData);
        const csvFileName = Object.keys(zip.files).find((fileName) =>
          fileName.endsWith(".csv")
        );
        if (!csvFileName) {
          throw new Error("CSV file not found in the zip");
        }
        const csvData = await zip.file(csvFileName).async("string");
        const parsedData = parseCSV(csvData);
        const renkoBricks = calculateRenkoBricks(parsedData, brickSize);
        setRenkoData(renkoBricks);
      } catch (error) {
        console.error("Error fetching Binance data:", error);
      }
    };

    fetchBinanceData(date, symbol);
  }, [date, symbol, brickSize]);

  useEffect(() => {
    if (renkoData && chartContainerRef.current && !chart.current) {
      chart.current = createChart(chartContainerRef.current, {
        width: 1500,
        height: 300,
        layout: {
          backgroundColor: "#FFFFFF",
          textColor: "#000"
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.7)"
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.7)"
          }
        },
        timeScale: {
          timeVisible: false, // Renko charts traditionally do not show time axis
          secondsVisible: false
        }
      });

      const series = chart.current.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickVisible: false
      });

      const markersData = [
        {
          time: renkoData[1].time,
          position: "belowBar",
          color: "blue",
          shape: "circle",
          id: "marker-id-1"
        },
        {
          time: renkoData[renkoData.length - 2].time,
          position: "belowBar",
          color: "blue",
          shape: "circle",
          id: "marker-id-2"
        }
      ];

      series.setMarkers(markersData);

      chart.current.subscribeClick((param) => {
        if (param.time) {
          const marker = markersData.find(
            (marker) => marker.time === param.time
          );
          if (marker) {
            setModalContent(`Event at time: ${marker.time}`);
            setShowModal(true);
          }
        }
      });

      const candlestickData = renkoData.map((brick) => ({
        time: brick.time, // Unique time value for each brick
        open: brick.type === "up" ? brick.price - brickSize : brick.price,
        high: brick.price + brickSize / 2,
        low: brick.price - brickSize / 2,
        close: brick.type === "up" ? brick.price : brick.price - brickSize
      }));

      series.setData(candlestickData);
    }
  }, [renkoData, brickSize]);
  return (
    <>
      <div
        ref={chartContainerRef}
        className="RenkoChartContainer"
        style={{ width: "100%", height: "300px" }}
      />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {modalContent}
      </Modal>
    </>
  );
};

export default RenkoChart;
