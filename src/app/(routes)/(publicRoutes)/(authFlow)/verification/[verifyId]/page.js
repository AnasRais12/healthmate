'use client';
import OtpScreen from '@/components/AuthComp/OtpScreen';
import { Box, useTheme } from '@mui/material';
import React from 'react';

const page = () => {
  const theme = useTheme();
  return (
    <Box sx={{ bgcolor: theme.palette.background.disabled }}>
      <OtpScreen />
    </Box>
  );
};

export default page;