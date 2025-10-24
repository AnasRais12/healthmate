import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// common
import axios from 'axios';

// materai ui
import {
  Menu,
  MenuItem,
  Divider,
  Typography,
  Box,
  ListItemIcon,
  useTheme,
} from '@mui/material';
// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useColorMode } from '@/theme/ThemeContext';
//utils
import {
  getMainMenuItems,
  getAppearanceMenuItems,
  getLocationMenuItems,
  getRestrictedModeMenuItems,
  getSendFeedbackMenuItems,
  getHelpMenuItems,
} from '@/utils/NavbarMenuArrayList';
import {
  addRestricted,
  addSelectedCountry,
} from '@/Store/Feature/Menubar/MenubarSlice';

// redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// components
import AlertModal from '../modal/AlertModal';

export const CustomMenu = ({ anchorEl, open, onClose, user }) => {
  const router = useRouter();
  const selectedCountry = useSelector((state) => state.menu.selectedCountry);
  const restrictedMode = useSelector((state) => state.menu.Restricted);
  const { mode, setMode } = useColorMode();
  const dispatch = useDispatch();
  const themeColor = useTheme();
  const [countries, setCountries] = useState([]);
  const [Loader, setLoaders] = useState({
    sendFeedbackLoader: false,
  });
  const [selectedItems, setSelectedItems] = useState({
    LightDarkThemeMenu: mode,
    activeMenu: 'main',
    Tracklocation: selectedCountry || '',
    restrictMode: restrictedMode,
    sendFeedBack: '',
    help: '',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,cca2'
        );
        const data = await res.json();

        // Extract just name + code
        const formatted = data.map((c) => ({
          name: c.name.common,
          code: c.cca2,
        }));

        // Optional: sort alphabetically
        formatted.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
      } catch (err) {
        console.error('Error fetching countries:', err);
      }
    };

    const savedLocation = localStorage.getItem('selectedCountry');
    const savedRestric = localStorage.getItem('restrictedMode');

    if (savedLocation) {
      setSelectedItems((prev) => ({
        ...prev,
        Tracklocation: savedLocation,
      }));
    }
    if (savedRestric) {
      setSelectedItems((prev) => ({
        ...prev,
        restrictMode: true,
      }));
    }

    fetchCountries();
  }, []);

  const setItemAndReload = (country, switcher) => {
    if (country) {
      dispatch(addSelectedCountry(country));
      window.location.reload();
      setSelectedItems((prev) => ({
        ...prev,
        Tracklocation: country,
      }));
    }
    if (switcher === true || switcher === false) {
      dispatch(addRestricted(switcher));
      setSelectedItems((prev) => ({
        ...prev,
        restrictMode: switcher,
      }));
      window.location.reload();
    }
  };

  const handleSendFeedback = async () => {
    try {
      setLoaders((prev) => ({
        ...prev,
        sendFeedbackLoader: true,
      }));
      const message = selectedItems.sendFeedBack.trim();
      if (!message) return;

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/common/feedback`,
        {
          name: 'Anas Baig', // agar user ka naam hai to ussey lo
          email: 'anas@example.com', // user email yahan do
          message: message,
        }
      );

      if (res.data) {
        AlertModal({
          icon: 'success',
          title: 'Feedback Submitted!',
          text: 'Thanks for your valuable feedback.',
          buttonText: 'Close',
          infoButtonText: 'Cancel',
        });

        setSelectedItems((prev) => ({
          ...prev,
          activeMenu: 'main',
          sendFeedBack: '',
        }));
      } else {
        alert('Failed to send feedback.');
      }
    } catch (err) {
      console.error('Error sending feedback:', err);
      alert('Failed to send feedback.');
    } finally {
      setLoaders((prev) => ({
        ...prev,
        sendFeedbackLoader: false,
      }));
    }
  };
  const toggleColor = (theme) => {
    setMode(theme);
    setSelectedItems((prev) => ({
      ...prev,
      LightDarkThemeMenu: theme,
    }));
  };

  const menuData = {
    main: getMainMenuItems(mode, setSelectedItems, user, selectedItems, router),
    appearance: getAppearanceMenuItems(
      selectedItems,
      toggleColor,
      setSelectedItems
    ),
    location: getLocationMenuItems(
      selectedItems,
      countries,
      setSelectedItems,
      themeColor,
      setItemAndReload
    ),
    restrict: getRestrictedModeMenuItems(
      themeColor,
      setSelectedItems,
      user,
      selectedItems,
      mode,
      setItemAndReload
    ),
    sendFeedBack: getSendFeedbackMenuItems(
      setSelectedItems,
      selectedItems,
      themeColor,
      handleSendFeedback,
      Loader.sendFeedbackLoader
    ),
    help: getHelpMenuItems(setSelectedItems),
  };

  const renderMenuItems = (items) =>
    items.map((item, index) => {
      if (item.type === 'divider') {
        return <Divider key={index} />;
      }
      if (item.type === 'info') {
        return <Box key={index}>{item.content}</Box>;
      }

      return (
        <MenuItem
          key={index}
          onClick={item.onClick}
          selected={item.selected}
          sx={{
            color: item.color || 'inherit',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <Typography variant="inherit" fontSize={'17px'}>
              {item.label}
            </Typography>
          </Box>

          {item.trailingIcon && <ChevronRightIcon fontSize="small" />}
        </MenuItem>
      );
    });

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={() => {
        onClose();
        setSelectedItems((prev) => ({
          ...prev,
          activeMenu: 'main',
        }));
      }}
      PaperProps={{
        sx: {
          mt: 2,
          minWidth: 300,
          maxWidth: 300, // prevents growing
          borderRadius: 2,
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {selectedItems.activeMenu === 'main' && renderMenuItems(menuData.main)}
      {selectedItems.activeMenu === 'appearance' &&
        renderMenuItems(menuData.appearance)}
      {selectedItems.activeMenu === 'location' &&
        renderMenuItems(menuData.location)}
      {selectedItems.activeMenu === 'restrictMode' &&
        renderMenuItems(menuData.restrict)}
      {selectedItems.activeMenu === 'sendFeedBack' &&
        renderMenuItems(menuData.sendFeedBack)}
      {selectedItems.activeMenu === 'help' && renderMenuItems(menuData.help)}
    </Menu>
  );
};
