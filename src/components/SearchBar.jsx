import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ value, onChange }) {
  return (
    <TextField
      variant="outlined"
      size="small"
      id="search"
      label="Caută medici"
      placeholder="Nume/specializare/oras.."
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
      sx={{ flex: { xs: "1 1 100px", sm: "1 1 260px" }, maxWidth: 320, minWidth: 0 }}
    />
  );
}
