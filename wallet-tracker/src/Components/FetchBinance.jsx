import React, { useState, useEffect } from 'react';
import CryptoChart from './CryptoChart';
import { Loader } from 'lucide-react';
import { div } from 'framer-motion/client';

const BinanceAPI = 'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=100000';

const CryptoDashboard = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(BinanceAPI);
      const rawData = await response.json();
      const formattedData = rawData.map(([time, open, high, low, close]) => ({
        time: time / 1000, 
        open: parseFloat(open),
        high: parseFloat(high),
        low: parseFloat(low),
        close: parseFloat(close),
      }));
      setChartData(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {chartData.length > 0 ? (
        <CryptoChart data={chartData} />
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        <Loader/>
        <p>
          Loading chart data...
        </p>
        </div>
       
      )}
    </div>
  );
};

export default CryptoDashboard;
