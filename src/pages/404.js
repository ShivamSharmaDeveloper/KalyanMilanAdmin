// import Head from 'next/head';
// import NextLink from 'next/link';
import ArrowLeftIcon from '@heroicons/react/24/solid/ArrowLeftIcon';
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Dynamically set the document title
    document.title = '404 | KalyanMatka Official';

    // Clean up the effect when the component unmounts
    return () => {
      document.title = 'KalyanMatka Official'; // Set a default title if needed
    };
  }, []);
  return (
    <>
      {/* <Head>
      <title>
        404 | Devias Kit
      </title>
    </Head> */}
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: 'center'
              }}
            >
              <img
                alt="Under development"
                src="/assets/errors/error-404.png"
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 400
                }}
              />
            </Box>
            <Typography
              align="center"
              sx={{ mb: 3 }}
              variant="h3"
            >
              404: The page you are looking for isn’t here
            </Typography>
            <Typography
              align="center"
              color="text.secondary"
              variant="body1"
            >
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Button
              startIcon={(
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              )}
              sx={{ mt: 3 }}
              variant="contained"
              onClick={() => navigate('/home', { replace: true }) }
            >
              Go back to dashboard
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  )
};

export default ErrorPage;
