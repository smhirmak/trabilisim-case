import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [btc, setBtc] = useState<any>(null);
  const [ltc, setLtc] = useState<any>(null);

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
            }
          ]
        })
      );
    };
    ws.onmessage = (event) => {
      const variable = JSON.parse(event.data);
      variable.arg.instId === 'BTC-USDT' ? setBtc(variable) : setLtc(variable);
    };
    return () => {
      ws.close();
    };
  }, []);
  // btc && console.log(btc?.data?.[0].last);
  // ltc && console.log(ltc?.data?.[0].last);
  return (
    <div className="App">
      <h1>OKX API</h1>
      <p>{btc && btc?.data?.[0].last}</p>
    </div>
  );
}

export default App;
