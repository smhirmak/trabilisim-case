import { useState, useEffect } from 'react';
import './App.css';
import { CryptoDataItem, CryptoTickerData } from './types/types';
import CryptoCard from './components/CryptoCard';

function App() {
  const [coinsData, setCoinsData] = useState<{ [key: string]: CryptoDataItem[] }>({});

  function processWebSocketData(data: CryptoTickerData) {
    const instId = data.arg.instId;
    if (data?.data)
      setCoinsData((prevData) => ({
        ...prevData,
        [instId]: [...(prevData[instId] || []).slice(0, 9), data?.data?.[0]]
      }));
  }

  useEffect(() => {
    const ws = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 'subscribe',
          args: [
            {
              channel: 'tickers',
              instId: 'BTC-USDT'
            },
            {
              channel: 'tickers',
              instId: 'LTC-USDT'
            },
            {
              channel: 'tickers',
              instId: 'ETH-USDT'
            },
            {
              channel: 'tickers',
              instId: 'XRP-USDT'
            },
            {
              channel: 'tickers',
              instId: 'BCH-USDT'
            },
            {
              channel: 'tickers',
              instId: 'DOGE-USDT'
            }
          ]
        })
      );
    };
    ws.onmessage = (event) => {
      const variable: CryptoTickerData = JSON.parse(event.data);
      processWebSocketData(variable);
    };
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="App">
      <h1>OKX API</h1>

      <div>
        {Object.keys(coinsData).map((coinName: any, i) => {
          const data = coinsData[coinName];

          return <CryptoCard key={i} coinName={coinName} data={data} />;
        })}
      </div>
    </div>
  );
}

export default App;
