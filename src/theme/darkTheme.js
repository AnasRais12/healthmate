// // src/theme/darkTheme.js
// import { createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#3b82f6', // Soft blue
//     },
//     background: {
//       default: '#0f0f0f', // Page background
//       paper: '#1c1c1e',   // Card/input background
//       disabled: '#2a2a2a',
//       error: '#680505ff'

//     },
//     cancelButton: {
//       main: '#2e2e2e',         // Dark gray background
//       contrastText: '#ff6b6b', // Soft red/pink text
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#a1a1aa', // Muted gray
//       switcherColor: '#3b82f6',
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, sans-serif',
//     button: {
//       textTransform: 'none',
//       fontSize: '17px',
//       fontWeight: 500,
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
//           backgroundColor: '#1c1c1e',
//           borderRadius: 8,
//           fontSize: 18,
//           color: '#fff',
//           '& .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#3b82f6',
//           },
//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#60a5fa',
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#93c5fd',
//             borderWidth: '2px',
//           },
//         },
//         input: {
//           padding: '16px',
//           fontSize: '19px'
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontSize: 18,
//           fontFamily: 'sans-serif',
//           color: '#a1a1aa',
//           '&.Mui-focused': {
//             color: '#93c5fd',
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
//           padding: '10px 18px',
//           fontFamily: 'Inter, sans-serif',
//           textTransform: 'none',
//           backgroundColor: '#3b82f6',
//           color: '#fff',
//           [theme.breakpoints.up('lg')]: {
//             fontSize: '18px',
//           },
//           '&.Mui-disabled': {
//             cursor: 'not-allowed !important',
//             pointerEvents: 'auto',
//           }
//         }),
//       },
//     },
//     MuiDataGrid: {
//       styleOverrides: {
//         columnHeaders: {
//           backgroundColor: '#c7c7daff',
//         },
//         columnHeaderTitle: {
//           fontSize: '16px',
//           fontWeight: 'bold',
//         },
//         cell: {
//           display: 'flex',
//           alignItems: 'center',
//           pr: '6px',
//           whiteSpace: 'nowrap',
//           color: '#e5e5e5',
//         },
//       },
//     },
//   },
// });

// export default darkTheme;

// src/theme/darkTheme.js
import { createTheme } from '@mui/material/styles';

// const darkTheme = createTheme({ 
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#3b82f6', // Soft blue
//     },
//     background: {
//       default: '#0f0f0f', // Page background
//       paper: '#1c1c1e',   // Card/input background
//       disabled: '#2a2a2a',
//       error: '#680505ff'

//     },
//     cancelButton: {
//       main: '#2e2e2e',         // Dark gray background
//       contrastText: '#ff6b6b', // Soft red/pink text
//     },
//     text: {
//       primary: '#ffffff',
//       secondary: '#a1a1aa', // Muted gray
//       switcherColor: '#3b82f6',
//     },
//   },
//   typography: {
//     fontFamily: 'Inter, sans-serif',
//     button: {
//       textTransform: 'none',
//       fontSize: '17px',
//       fontWeight: 500,
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
//           backgroundColor: '#1c1c1e',
//           borderRadius: 8,
//           fontSize: 18,
//           color: '#fff',

//           '&:hover .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#60a5fa',
//           },
//           '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//             borderColor: '#93c5fd',
//             borderWidth: '2px',
//           },
//         },
//         input: {
//           padding: '16px',
//           fontSize: '19px'
//         },
//       },
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           fontSize: 18,
//           fontFamily: 'sans-serif',
//           color: '#a1a1aa',
//           '&.Mui-focused': {
//             color: '#93c5fd',
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
//           padding: '10px 18px',
//           fontFamily: 'Inter, sans-serif',
//           textTransform: 'none',
//           backgroundColor: '#3b82f6',
//           color: '#fff',
//           [theme.breakpoints.up('lg')]: {
//             fontSize: '18px',
//           },
//           '&.Mui-disabled': {
//             cursor: 'not-allowed !important',
//             pointerEvents: 'auto',
//           }
//         }),
//       },
//     },
//     MuiDataGrid: {
//       styleOverrides: {
//         columnHeaders: {
//           backgroundColor: '#c7c7daff',
//         },
//         columnHeaderTitle: {
//           fontSize: '16px',
//           fontWeight: 'bold',
//         },
//         cell: {
//           display: 'flex',
//           alignItems: 'center',
//           pr: '6px',
//           whiteSpace: 'nowrap',
//           color: '#e5e5e5',
//         },
//       },
//     },
//   },
// });

// export default darkTheme;


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#22c55e', // Bright green (Saylani inspired)
    },

    secondary: {
      main: '#3b82f6', // Soft blue as secondary
    },
    background: {
      default: '#0d0f0f', // Page background
      paper: '#1a1c1c',   // Card/input background
      disabled: '#2a2a2a',
      error: '#ef4444',   // Accessible red
    },
    cancelButton: {
      main: '#2e2e2e',         // Dark gray background
      contrastText: '#ff6b6b', // Soft red/pink text
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#a1a1aa',
      switcherColor: '#22c55e', // Matches primary
    },
  },
  customGradients: {
    background: "linear-gradient(to right, #0b0f1a, #1a2233, #111827)",
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    button: {
      textTransform: 'none',
      fontSize: '17px',
      fontWeight: 500,
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
          backgroundColor: '#1a1c1c',
          borderRadius: 8,
          fontSize: 18,
          color: '#f5f5f5',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#333',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#3b82f6',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#22c55e',
            borderWidth: '2px',
          },
        },
        input: {
          padding: '16px',
          fontSize: '17px',
          color: '#f5f5f5',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 16,
          fontFamily: 'Inter, sans-serif',
          color: '#a1a1aa',
          '&.Mui-focused': {
            color: '#22c55e',
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
          padding: '10px 18px',
          fontFamily: 'Inter, sans-serif',
          textTransform: 'none',
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
          [theme.breakpoints.up('lg')]: {
            fontSize: '18px',
          },
          '&:hover': {
            backgroundColor: '#16a34a',
          },
          '&.Mui-disabled': {
            cursor: 'not-allowed !important',
            pointerEvents: 'auto',
          },
        }),
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          backgroundColor: '#111111',
        },
        columnHeaderTitle: {
          fontSize: '15px',
          fontWeight: 'bold',
          color: '#f5f5f5',
        },
        cell: {
          display: 'flex',
          alignItems: 'center',
          pr: '6px',
          whiteSpace: 'nowrap',
          color: '#e5e5e5',
        },
      },
    },
  },
});

export default darkTheme;