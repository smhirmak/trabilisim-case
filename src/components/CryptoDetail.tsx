import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Drawer, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CoinsEnum, CryptoDataItem, expandedName } from '../types/types';
import OrderBook from './OrderBook';

const CryptoDetail: React.FC<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: CryptoDataItem[];
  coinName: CoinsEnum;
  coinImage: string;
}> = ({ isOpen, setIsOpen, data, coinName, coinImage }) => {
  const themePage = useTheme();
  const isMobile = useMediaQuery(themePage.breakpoints.down('md'));
  return (
    <Drawer
      PaperProps={{ style: { width: isMobile ? '90%' : '75%' } }}
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}>
      <Button
        sx={{
          position: 'fixed',
          right: isMobile ? '10px' : '25px',
          top: isMobile ? '10px ' : '25px'
        }}
        onClick={() => setIsOpen(false)}>
        <CloseIcon fontSize={isMobile ? 'small' : 'large'} />
      </Button>
      <Grid container justifyContent="center" alignItems="center" height="100%" bgcolor={'#091727'}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: isMobile ? '20px' : '100px',
              padding: 2
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
              <img src={coinImage} width={isMobile ? '75px' : '170px'} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: ' center'
                }}>
                <Typography variant="body1">{coinName}</Typography>
                <Typography variant="caption">{expandedName[coinName]}</Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: isMobile ? '20px' : '80px',
                paddingX: isMobile ? 0.5 : 10
              }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: isMobile ? '0px' : '25px'
                }}>
                <Box>
                  <Typography
                    variant={isMobile ? 'caption' : 'body1'}
                    sx={{ color: 'text.secondary' }}>
                    Best ask price
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    $ {data[data.length - 1].askPx}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end'
                  }}>
                  <Typography
                    variant={isMobile ? 'caption' : 'body1'}
                    sx={{ color: 'text.secondary' }}>
                    Best bid price
                  </Typography>
                  <Typography variant="body2">$ {data[data.length - 1].bidPx}</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end'
                }}>
                <Box>
                  <Typography
                    variant={isMobile ? 'caption' : 'body1'}
                    sx={{ color: 'text.secondary' }}>
                    Highest price (24h)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.primary' }}>
                    $ {data[data.length - 1].high24h}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end'
                  }}>
                  <Typography
                    variant={isMobile ? 'caption' : 'body1'}
                    sx={{ color: 'text.secondary' }}>
                    Lowest price (24h)
                  </Typography>
                  <Typography variant="body2">$ {data[data.length - 1].low24h}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container bgcolor={'#091727'} spacing={2}>
            <Grid item xs={12} md={6}>
              <OrderBook type={'ask'} data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <OrderBook type={'bid'} data={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CryptoDetail;
