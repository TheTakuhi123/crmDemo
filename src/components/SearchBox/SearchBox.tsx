import { FC, useState, useEffect } from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBoxProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  delay?: number;
  defaultValue?: string;
}

const SearchBox: FC<SearchBoxProps> = ({ 
  onSearch, 
  placeholder = "Hledat...", 
  delay = 500,
  defaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (inputValue === defaultValue) return;

    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [inputValue, delay, onSearch, defaultValue]);

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      autoComplete="off"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        },
      }}
      sx={{
        maxWidth: 250,
        '& .MuiOutlinedInput-root': {
          height: 36,
          borderRadius: '1rem', 
          backgroundColor: '#fff',
          fontSize: '0.875rem',
          '& fieldset': {
            borderColor: '#e0e6e8',
          },
          '&:hover fieldset': {
            borderColor: '#00a3ad',
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px',
            borderColor: '#00a3ad',
          },
        },
        '& .MuiInputBase-input': {
          padding: '8px 14px',
        },
      }}
    />
  );
};

export default SearchBox;
