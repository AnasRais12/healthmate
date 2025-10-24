// pages/404.jsx
'use client';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();
  const lightTheme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: lightTheme.palette.background.default, // #ffffff
        color: lightTheme.palette.text.primary, // #000000
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Box>
        <Typography
          variant="h1"
          sx={{
            fontSize: '6rem',
            fontWeight: 'bold',
            color: 'black', // #000000
            fontFamily: lightTheme.typography.fontFamily, // Inter, sans-serif
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: '', // Matches your InputLabel root color
            fontFamily: lightTheme.typography.fontFamily,
          }}
        >
          Oops! Page not found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            maxWidth: '500px',
            mx: 'auto',
            color: '#555',
            fontSize: lightTheme.typography.body1.fontSize, // 17px
            fontFamily: lightTheme.typography.fontFamily,
          }}
        >
          Looks like you’ve taken a wrong turn. Let’s take you back home
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push('/')}
          sx={{
            backgroundColor: lightTheme.palette.primary.main, // #000000
            '&:hover': {
              backgroundColor: '#333333', // Darker shade for hover
            },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}


