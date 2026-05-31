import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <Box sx={{ px: 2.5, py: 1.75 }}>
      <TextField
        fullWidth
        variant="outlined"
        size="medium"
        id="search"
        label="Caută medici"
        placeholder="Caută medici după nume / specializare / locație"
        autoComplete="off"
        inputProps={{ inputMode: "search" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Box>
  );
}
