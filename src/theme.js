import { createTheme } from "@mui/material/styles";

const baseShape = { borderRadius: 6 };

const baseTypography = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

export function createAppTheme(mode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#4d5edb" : "#212d97",
      },
      background: {
        default: isDark ? "#0f1117" : "#f3f4f6",
        paper: isDark ? "#1a1d27" : "#ffffff",
      },
      text: {
        primary: isDark ? "#e8eaf0" : "#111827",
        secondary: isDark ? "#8b92a5" : "#6b7280",
      },
      divider: isDark
        ? "rgba(255, 255, 255, 0.08)"
        : "rgba(17, 24, 39, 0.12)",
    },
    shape: baseShape,
    typography: baseTypography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundImage: "none",
            boxShadow: isDark
              ? "0 4px 24px rgba(0, 0, 0, 0.50)"
              : "0 4px 20px rgba(0, 0, 0, 0.10)",
          },
        },
      },
    },
  });
}
