import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CoinsEnum, CryptoDataItem, expandedName } from '../types/types';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CryptoDetail from './CryptoDetail';
import { useState } from 'react';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';

const CryptoCard: React.FC<{ data: CryptoDataItem[]; coinName: CoinsEnum }> = ({
  data,
  coinName
}) => {
  const { last, sodUtc0 } = data[data.length - 1];
  const [isOpen, setIsOpen] = useState(false);
  const percent = ((+sodUtc0 - +last) / +last) * 100;

  const coinImage = `https://static.okx.com/cdn/oksupport/asset/currency/icon/${coinName
    .replace('-USDT', '')
    .toLowerCase()}.png?x-oss-process=image/format,webp`;

  return (
    <>
      <Card sx={{ marginBottom: '1rem', cursor: 'pointer' }}>
        <CardContent onClick={() => setIsOpen((prev) => !prev)}>
          <Box display="flex" justifyContent="center" gap={2}>
            <CardMedia component={'img'} image={coinImage} sx={{ width: '50px' }} />
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{coinName}</Typography>
              <Typography variant="caption">{expandedName[coinName]}</Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="end" flexDirection="column">
            <Typography variant="body1">$ {data[data.length - 1].last}</Typography>
            <Box
              color={percent > 0 ? 'green' : percent === 0 ? 'gray' : 'red'}
              display="flex"
              justifyContent="center"
              alignItems="center">
              {percent > 0 ? (
                <ArrowOutwardIcon fontSize="small" />
              ) : percent == 0 ? (
                <HorizontalRuleIcon />
              ) : (
                <ArrowOutwardIcon fontSize="small" sx={{ rotate: '90deg' }} />
              )}
              <Typography
                sx={{
                  color: percent > 0 ? 'green' : percent == 0 ? 'gray' : 'red',
                  fontWeight: '600'
                }}>
                {percent < 0 ? percent.toFixed(2).substring(1) : percent.toFixed(2)}%
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <CryptoDetail
        coinImage={coinImage}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        coinName={coinName}
        data={data}
      />
    </>
  );
};

export default CryptoCard;
