import { ThemeProvider as MaterialThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme();

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
};
