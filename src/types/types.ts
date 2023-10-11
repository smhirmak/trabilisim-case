export interface CryptoData {
  name: string;
  data: CryptoDataItem[];
}
export interface CryptoDataItem {
  instType: string;
  instId: string;
  last: string;
  lastSz: string;
  askPx: string;
  askSz: string;
  bidPx: string;
  bidSz: string;
  open24h: string;
  high24h: string;
  low24h: string;
  volCcy24h: string;
  vol24h: string;
  sodUtc0: string;
  sodUtc8: string;
  ts: string;
}

export interface CryptoTickerData {
  arg: {
    channel: string;
    instId: string;
  };
  data: CryptoDataItem[];
}