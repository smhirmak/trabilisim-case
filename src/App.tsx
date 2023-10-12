import { useState, useEffect } from 'react';
import './App.css';
import { CryptoDataItem, CryptoTickerData } from './types/types';
import CryptoCard from './components/CryptoCard';
import { Box, Container } from '@mui/material';

function App() {
  const [coinsData, setCoinsData] = useState<{ [key: string]: CryptoDataItem[] }>({});
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
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
      setLoading(false);
    };
  }, []);

  // console.log(coinsData);

  return (
    <Container>
      <h1>TRA Bilişim Case</h1>
      <Box>
        {loading ? (
          <div>
            {Object.keys(coinsData).map((coinName: any, i) => {
              const data = coinsData[coinName];
              return <CryptoCard key={i} coinName={coinName} data={data} />;
            })}
          </div>
        ) : (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              bottom: '50%',
              right: '50%',
              left: '50%'
            }}>
            <span className="loader"></span>
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default App;
