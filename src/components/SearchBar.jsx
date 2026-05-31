import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

export default function SearchBar({ value, onChange }) {
  return (
    <Paper
      variant="outlined"
      sx={{ px: 2.5, py: 1.75 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="medium"
        id="search"
        label="Caută medici"
        placeholder="Caută după nume, specialitate, clinică sau locație…"
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
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1.5, display: "block" }}
      >
        Exemplu: „București", „Cardiologie" sau numele unei clinici.
      </Typography>
    </Paper>
  );
}
