import { Box, Container, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import CryptoCard from './components/CryptoCard';
import { CoinsEnum, CryptoDataItem, CryptoTickerData } from './types/types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [coinsData, setCoinsData] = useState<{ [key in CoinsEnum]?: CryptoDataItem[] }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const themePage = useTheme();
  const isMobile = useMediaQuery(themePage.breakpoints.down('md'));

  function processWebSocketData(data: CryptoTickerData) {
    const instId = data.arg.instId;
    if (data?.data)
      setCoinsData((prevData) => {
        const updatedData = {
          ...prevData,
          [instId]: [...(prevData[instId] || [])]
        };

        if (!updatedData[instId] || updatedData[instId]!.length < 10) {
          updatedData[instId] = [data.data[0], ...(updatedData[instId] || [])];
        } else {
          updatedData[instId]!.pop();
          updatedData[instId] = [data.data[0], ...updatedData[instId]!];
        }

        return updatedData;
      });
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

  return (
    <Container>
      <Box display={'flex'} justifyContent={'center'} pt={3}>
        <Typography variant={isMobile ? 'h4' : 'h3'} component="h1">
          Crypto Price List
        </Typography>
      </Box>
      <Box py={isMobile ? 1 : 2}>
        <Divider />
      </Box>
      <>
        {loading ? (
          <>
            {Object.keys(coinsData)
              .sort()
              .map((coinName, i) => {
                const data = coinsData[coinName as keyof typeof CoinsEnum];
                return <CryptoCard key={i} coinName={coinName as CoinsEnum} data={data!} />;
              })}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '85vh'
            }}>
            <span className="loader"></span>
          </Box>
        )}
      </>
    </Container>
  );
}

export default App;
