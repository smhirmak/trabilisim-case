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
    instId: CoinsEnum;
  };
  data: CryptoDataItem[];
}

export type ExpandedName = {
  [key in CoinsEnum]: string;
};

export enum CoinsEnum {
  'BTC-USDT' = 'BTC-USDT',
  'LTC-USDT' = 'LTC-USDT',
  'ETH-USDT' = 'ETH-USDT',
  'BCH-USDT' = 'BCH-USDT',
  'XRP-USDT' = 'XRP-USDT',
  'DOGE-USDT' = 'DOGE-USDT'
}

export const expandedName: ExpandedName = {
  [CoinsEnum['BTC-USDT']]: 'Bitcoin',
  [CoinsEnum['LTC-USDT']]: 'Litecoin',
  [CoinsEnum['ETH-USDT']]: 'Ethereum',
  [CoinsEnum['BCH-USDT']]: 'Bitcoin Cash',
  [CoinsEnum['XRP-USDT']]: 'Ripple',
  [CoinsEnum['DOGE-USDT']]: 'Dogecoin'
};
