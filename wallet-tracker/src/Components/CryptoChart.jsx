import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

const CryptoChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.offsetWidth,
      height: '759',
      layout: {
        background: {
          type: 'solid',
          color: '#1e2128', // Dark professional background
        },
        textColor: '#d1d4dc', // Light gray text
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.2)', // Subtle vertical grid
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.2)', // Subtle horizontal grid
        },
      },
      priceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)', // Accent border for scale
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)', // Accent border for scale
      },
      crosshair: {
        mode: 1, // Show crosshair on hover
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', // Smooth green for bullish candles
      downColor: '#ef5350', // Smooth red for bearish candles
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });

    candlestickSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        borderRadius: '8px', // Rounded corners
        overflow: 'hidden',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)', // Subtle shadow
      }}
    />
  );
};

export default CryptoChart;
