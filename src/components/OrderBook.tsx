import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CryptoDataItem } from '../types/types';

const OrderBook: React.FC<{ type: 'ask' | 'bid'; data: CryptoDataItem[] }> = ({ type, data }) => {
  const size = type === 'ask' ? 'askSz' : 'bidSz';
  const price = type === 'ask' ? 'askPx' : 'bidPx';
  const totalSize = data.reduce((acc, current) => acc + +current[size], 0);

  const themePage = useTheme();
  const isMobile = useMediaQuery(themePage.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: type === 'ask' ? '#14262A' : '#231723',
        borderRadius: '6px',
        padding: isMobile ? '10px' : '20px',
        marginX: isMobile ? '10px' : '0px',
        width: isMobile ? '93%' : '100%'
      }}>
      <Grid container spacing={1.5}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body2">{type === 'ask' ? 'Ask Size' : 'Bid Size'}</Typography>

            <Typography variant="body2">{type === 'ask' ? 'Ask Price' : 'Bid Price'}</Typography>
          </Box>
        </Grid>
        {data.map((e) => {
          const percentAsk = (+e[size] / +totalSize) * 100;
          return (
            <Grid item xs={12} key={e.ts}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" justifyContent="flex-start">
                  <Typography variant="subtitle1">{e[size]}</Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: type === 'ask' ? '#174935' : '#651019',
                    width: `${percentAsk}%`,
                    height: '30px',
                    justifyContent: 'flex-end',
                    display: 'flex'
                  }}>
                  <Typography variant="subtitle1" color={type === 'ask' ? '#23B857' : '#FE0000'}>
                    {e[price]}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default OrderBook;
