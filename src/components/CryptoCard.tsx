import { Card } from '@mui/material';
import { CryptoDataItem } from '../types/types';

const CryptoCard: React.FC<{ data: CryptoDataItem[]; coinName: string }> = ({ data, coinName }) => {
  const { last, high24h } = data[data.length - 1];
  const percent = ((+high24h - +last) / +last) * 100;
  return (
    <Card>
      {coinName}: {data[data.length - 1].last} - %{percent.toFixed(2)}
    </Card>
  );
};

export default CryptoCard;
