import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';

// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Notifications from '@mui/icons-material/Notifications';

import { useTheme } from '@mui/material/styles';
import Sidebar from '../common/Sidebar';
import SearchBar from '../navbar/SearchBar';
import { CustomMenu } from '../navbar/MenuModal';
import { useRouter } from 'next/navigation';

const videos = new Array(12).fill(0);

export default function HomePage() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [user, setUser] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className="flex"
      sx={{
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      <Sidebar />

      <Box
        className="flex-1 transition-all duration-300"
        sx={{
          paddingLeft: '72px',
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          minHeight: '100vh',
        }}
      >
        <AppBar
          sx={{
            backgroundColor: theme.palette.background.paper,
            zIndex: 1200,
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
          position="sticky"
        >
          <Toolbar className="flex justify-between">
            <Box className="flex items-center gap-2">
              <img
                src="/yt-logo.png"
                alt="YouTube Clone Logo"
                className="w-24"
              />
            </Box>

            <Box sx={{ width: '40%' }}>
              <SearchBar />
            </Box>

            <Box className="flex items-center gap-4">
              {user && (
                <IconButton>
                  <Badge badgeContent={3} color="error">
                    <Notifications sx={{ fontSize: '28px' }} />
                  </Badge>
                </IconButton>
              )}

              <MoreVertIcon
                onClick={handleClick}
                sx={{
                  width: 32,
                  height: 32,
                  mr: '10px',
                  color: theme.palette.text.primary,
                }}
              />
              <CustomMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                user={user}
              />

              <Button
                onClick={() => router?.push('/signin')}
                variant="outlined"
                sx={{
                  borderColor: 'white',
                  textTransform: 'none',
                  backgroundColor: theme.palette.background.disabled,
                  color: theme.palette.text.primary,
                  borderRadius: '20px',
                  fontWeight: 500,
                  fontSize: '17px',
                  px: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  '&:hover': {
                    backgroundColor: theme.palette.background.disabled,
                  },
                }}
              >
                <AccountCircleIcon sx={{ fontSize: '30px' }} />
                Sign in
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {videos.map((_, i) => (
            <Card
              key={i}
              sx={{
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: theme.shadows[1],
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={`https://picsum.photos/id/${i + 10}/400/200`}
                alt={`Video thumbnail ${i + 1}`}
              />
              <CardContent className="flex gap-3">
                <Avatar />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Video Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Channel Name
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    1M views • 1 week ago
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
