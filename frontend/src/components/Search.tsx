import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { TextField, InputAdornment, IconButton } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = () => {
    if (keyword) {
      navigate(`/?keyword=${keyword}&page=1`);
    } else {
      navigate(location.pathname);
    }
  };

  const handleClear = () => {
    setKeyword('');
    navigate(location.pathname);
  };

  return (
    <TextField
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {keyword && (
              <IconButton onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            )}
            <IconButton onClick={submitHandler}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
