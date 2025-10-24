// // src/theme/lightTheme.js
// import { createTheme } from '@mui/material/styles';

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2', // Professional blue (Material UI default primary)
//     },
//     background: {
//       default: '#ffffff', // Clean white background
//       paper: '#f5f5f5',   // Light grey paper
//       disabled: '#e0e0e0',
//       error: '#680505ff'
//     },
//     cancelButton: {
//       main: '#ef9a9a',      // Light red background
//       contrastText: '#b71c1c', // Dark red text
//     },
//     text: {
//       primary: '#333333', // Dark grey text
//       switcherColor: '#1976d2', // Matches primary for consistency
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, sans-serif',
//     button: {
//       textTransform: 'none',
//       fontWeight: 500,
//       fontSize: '17px',
//       fontFamily: 'Inter, sans-serif',
//     },
//     body1: {
//       fontSize: '17px',
//     },
//   },
//   components: {
//     MuiTextField: {
//       defaultProps: {
//         variant: 'outlined',
//         margin: 'normal',
//         fullWidth: true,
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ffffff',
//           borderRadius: 8,
//           fontSize: 15,
//           fontFamily: 'Roboto, sans-serif',
//           color: '#333333',
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#b0bec5', // Soft grey border
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#90a4ae', // Slightly darker grey on hover
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#1976d2', // Primary blue on focus
//             borderWidth: '2px',
//           },
//         },
//         input: {
//           padding: '16px 10px',
//           color: '#333333',
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontSize: '14px',
//           fontWeight: 400,
//           color: '#607d8b', // Medium grey label
//           fontFamily: 'Inter, sans-serif',
//           '&.Mui-focused': {
//             color: '#1976d2', // Primary blue on focus
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: ({ theme }) => ({
//           borderRadius: 8,
//           fontSize: '16px',
//           fontWeight: 600,
//           padding: '10px 16px',
//           fontFamily: 'Inter, sans-serif',
//           textTransform: 'none',
//           [theme.breakpoints.up('lg')]: {
//             fontSize: '18px',
//           },
//           '&.Mui-disabled': {
//             cursor: 'not-allowed',
//             pointerEvents: 'auto'
//           },
//         }),
//       },
//     },
//   },
// });

// export default lightTheme;
// src/theme/lightTheme.js
import { createTheme } from '@mui/material/styles';

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     primary: {
//       main: '#1976d2', // Professional blue (Material UI default primary)
//     },
//     background: {
//       default: '#ffffff', // Clean white background
//       paper: '#f5f5f5',   // Light grey paper
//       disabled: '#e0e0e0',
//       error: '#680505ff'
//     },
//     cancelButton: {
//       main: '#ef9a9a',      // Light red background
//       contrastText: '#b71c1c', // Dark red text
//     },
//     text: {
//       primary: '#333333', // Dark grey text
//       switcherColor: '#1976d2', // Matches primary for consistency
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, sans-serif',
//     button: {
//       textTransform: 'none',
//       fontWeight: 500,
//       fontSize: '17px',
//       fontFamily: 'Inter, sans-serif',
//     },
//     body1: {
//       fontSize: '17px',
//     },
//   },
//   components: {
//     MuiTextField: {
//       defaultProps: {
//         variant: 'outlined',
//         margin: 'normal',
//         fullWidth: true,
//       },
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#ffffff',
//           borderRadius: 8,
//           fontSize: 15,
//           fontFamily: 'Roboto, sans-serif',
//           color: '#333333',
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#b0bec5', // Soft grey border
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#90a4ae', // Slightly darker grey on hover
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#1976d2', // Primary blue on focus
//             borderWidth: '2px',
//           },
//         },
//         input: {
//           padding: '16px 10px',
//           color: '#333333',
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontSize: '14px',
//           fontWeight: 400,
//           color: '#607d8b', // Medium grey label
//           fontFamily: 'Inter, sans-serif',
//           '&.Mui-focused': {
//             color: '#1976d2', // Primary blue on focus
//           },
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: ({ theme }) => ({
//           borderRadius: 8,
//           fontSize: '16px',
//           fontWeight: 600,
//           padding: '10px 16px',
//           fontFamily: 'Inter, sans-serif',
//           textTransform: 'none',
//           [theme.breakpoints.up('lg')]: {
//             fontSize: '18px',
//           },
//           '&.Mui-disabled': {
//             cursor: 'not-allowed',
//             pointerEvents: 'auto'
//           },
//         }),
//       },
//     },
//   },
// });

// export default lightTheme;


const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2E7D32', // Green (Saylani style)
    },
    background: {
      default: '#F5F6F7', // Soft grey background
      paper: '#ffffff',   // Clean white paper/cards
      disabled: '#e0e0e0',
      error: '#D32F2F',
    },
    cancelButton: {
      main: '#FFCDD2',      // Light red background
      contrastText: '#B71C1C', // Dark red text
    },
    text: {
      primary: '#212121',
      secondary: '#FFFFFF', // Dark grey text
      // Dark grey text
      switcherColor: '#2E7D32', // Matches primary for consistency
    },
  },
  customGradients: {
    background: "linear-gradient(to right, #0b0f1a, #1a2233, #111827)",
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '17px',
      fontFamily: 'Inter, sans-serif',
    },
    body1: {
      fontSize: '17px',
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderRadius: 8,
          fontSize: 15,
          fontFamily: 'Roboto, sans-serif',
          color: '#212121',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#b0bec5',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#90a4ae',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#2E7D32', // Green on focus
            borderWidth: '2px',
          },
        },
        input: {
          padding: '16px 10px',
          color: '#212121',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 400,
          color: '#607d8b',
          fontFamily: 'Inter, sans-serif',
          '&.Mui-focused': {
            color: '#2E7D32', // Green on focus
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          fontSize: '16px',
          fontWeight: 600,
          padding: '10px 16px',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          [theme.breakpoints.up('lg')]: {
            fontSize: '18px',
          },
          '&.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto'
          },
        }),
      },
    },
  },
});

export default lightTheme;