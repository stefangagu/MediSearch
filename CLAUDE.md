# MediSearch

## Design conventions

- **Form control heights**: `TextField` uses `size="small"` (40px) and
  `Button` uses `size="large"` (overridden to 40px in `theme.js` via
  `MuiButton.styleOverrides.sizeLarge`) so inputs and buttons placed in
  the same row line up. When adding a new button next to a small
  TextField, use `size="large"` to inherit this height automatically.
