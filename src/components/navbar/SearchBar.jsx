import { useState } from 'react';
import { InputBase, IconButton, Paper, Box, useTheme } from '@mui/material';
import { Mic, Search } from '@mui/icons-material';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const handleSearch = () => {
    console.log('Searching:', searchQuery);
  };

  return (
    <Box display="flex" alignItems="center" width="100%">
      {/* Search Input & Button */}
      <Paper
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          borderRadius: '999px',
          border: '1px solid #ccc',
          boxShadow: 'none',
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton
          type="submit"
          sx={{ p: '10px', borderLeft: '1px solid #ddd', borderRadius: 0 }}
          aria-label="search"
        >
          <Search />
        </IconButton>
      </Paper>

      {/* Mic Button */}
      <IconButton
        sx={{
          ml: 2,
          backgroundColor: theme.palette.background.disabled,
          '&:hover': { backgroundColor: theme.palette.background.disabled },
        }}
      >
        <Mic />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
