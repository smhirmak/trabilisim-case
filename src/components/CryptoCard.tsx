import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CryptoDataItem } from '../types/types';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const expandedName: string[] = [
  'Bitcoin',
  'Litecoin',
  'Ethereum',
  'Bitcoin Cash',
  'Ripple',
  'Dogecoin'
];

const CryptoCard: React.FC<{ data: CryptoDataItem[]; coinName: string }> = ({ data, coinName }) => {
  const { last, sodUtc0 } = data[data.length - 1];
  const percent = ((+sodUtc0 - +last) / +last) * 100;
  return (
    <Card sx={{ marginBottom: '1rem', cursor: 'pointer' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '15px' }}>
          <CardMedia
            component={'img'}
            image={`https://static.okx.com/cdn/oksupport/asset/currency/icon/${coinName
              .replace('-USDT', '')
              .toLowerCase()}.png?x-oss-process=image/format,webp`}
            sx={{ width: '50px' }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography fontWeight={600} fontSize={'1.2rem'}>
              {coinName}
            </Typography>
            <Typography sx={{ fontSize: '0.9rem' }}>
              {coinName === 'BTC-USDT'
                ? expandedName[0]
                : coinName === 'LTC-USDT'
                ? expandedName[1]
                : coinName === 'ETH-USDT'
                ? expandedName[2]
                : coinName === 'BCH-USDT'
                ? expandedName[3]
                : coinName === 'XRP-USDT'
                ? expandedName[4]
                : coinName === 'DOGE-USDT' && expandedName[5]}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'end', flexDirection: 'column' }}>
          <Typography fontWeight={600} sx={{ fontSize: '1.2rem' }}>
            $ {data[data.length - 1].last}
          </Typography>
          <Box
            sx={{
              color: percent > 0 ? 'green' : percent == 0 ? 'gray' : 'red',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            {percent > 0 ? (
              <ArrowOutwardIcon fontSize="small" />
            ) : percent == 0 ? (
              'gray'
            ) : (
              <ArrowOutwardIcon fontSize="small" sx={{ rotate: '90deg' }} />
            )}
            <Typography
              sx={{
                color: percent > 0 ? 'green' : percent == 0 ? 'gray' : 'red',
                fontWeight: '600'
              }}>
              {percent.toFixed(2)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
