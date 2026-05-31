import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { createAppTheme } from "./theme.js";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import DoctorProfile from "./components/DoctorProfile.jsx";
import { doctors } from "./data/doctors.js";
import { specialtiesRO } from "./data/specialtiesRO.js";

const CONTAINER_SX = {
  width: "min(1200px, calc(100% - 32px))",
  mx: "auto",
};

function getDoctorIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("doctor");
  const id = raw ? Number(raw) : null;
  return Number.isFinite(id) ? id : null;
}

function setDoctorIdInUrl(id) {
  const url = new URL(window.location.href);
  if (id == null) url.searchParams.delete("doctor");
  else url.searchParams.set("doctor", String(id));
  window.history.pushState({}, "", url);
}

function getInitialTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [activeDoctorId, setActiveDoctorId] = useState(() => getDoctorIdFromUrl());
  const [theme, setTheme] = useState(getInitialTheme);
  const muiTheme = useMemo(() => createAppTheme(theme), [theme]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    const onPopState = () => setActiveDoctorId(getDoctorIdFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const normalizedQuery = useMemo(() => search.trim().toLowerCase(), [search]);

  const handleToggleSpecialty = useCallback((specialty) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(specialty)) return prev.filter((x) => x !== specialty);
      return [...prev, specialty];
    });
  }, []);

  const handleClear = useCallback(() => {
    setSearch("");
    setSelectedSpecialties([]);
  }, []);

  const handleViewProfile = useCallback((id) => {
    setDoctorIdInUrl(id);
    setActiveDoctorId(id);
  }, []);

  const handleBackToList = useCallback(() => {
    setDoctorIdInUrl(null);
    setActiveDoctorId(null);
  }, []);

  const activeDoctor = useMemo(() => {
    if (activeDoctorId == null) return null;
    return doctors.find((d) => d.id === activeDoctorId) || null;
  }, [activeDoctorId]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSpecialty =
        selectedSpecialties.length === 0
          ? true
          : selectedSpecialties.includes(d.specialty);
      if (!matchesSpecialty) return false;
      if (!normalizedQuery) return true;
      const haystack =
        `${d.name} ${d.specialty} ${d.clinic} ${d.location}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [selectedSpecialties, normalizedQuery]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "background.paper" }}
        >
          <Box sx={CONTAINER_SX}>
            <Toolbar
              disableGutters
              sx={{ justifyContent: "space-between", py: 2 }}
            >
              <Box
                component="button"
                onClick={handleBackToList}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.75,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                  p: 0,
                  textAlign: "left",
                }}
              >
                <Avatar
                  aria-hidden="true"
                  sx={{
                    bgcolor: "primary.main",
                    width: 44,
                    height: 44,
                    fontWeight: 800,
                    fontSize: "18px",
                  }}
                >
                  M
                </Avatar>
                <Box>
                  <Typography
                    component="h1"
                    sx={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.3px" }}
                  >
                    MediSearch
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5, lineHeight: 1.4 }}
                  >
                    Transparență asupra medicilor: specializări, clinici și recenzii.
                  </Typography>
                </Box>
              </Box>

              <IconButton
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Activează modul luminos" : "Activează modul întunecat"}
                sx={{ border: 1, borderColor: "divider" }}
              >
                {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </Box>
        </AppBar>

        {/* Main */}
        <Box component="main" sx={{ flex: 1, py: { xs: 3, md: 5.5 } }}>
          <Box sx={CONTAINER_SX}>
            {activeDoctor ? (
              <DoctorProfile doctor={activeDoctor} onBack={handleBackToList} />
            ) : (
              <>
                <SearchBar value={search} onChange={setSearch} />

                <Filters
                  selectedSpecialties={selectedSpecialties}
                  allSpecialties={specialtiesRO}
                  onToggleSpecialty={handleToggleSpecialty}
                  onClear={handleClear}
                  resultsCount={filteredDoctors.length}
                />

                {filteredDoctors.length === 0 ? (
                  <Paper
                    variant="outlined"
                    role="status"
                    aria-live="polite"
                    sx={{ p: 4, mt: 2.25 }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ letterSpacing: "-0.2px", mb: 1 }}
                    >
                      Nu am găsit rezultate
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ lineHeight: 1.5, mb: 2.5 }}
                    >
                      Încearcă alt nume/locație/clinică sau debifează unele specializări.
                    </Typography>
                    <Button variant="outlined" onClick={handleClear}>
                      Resetează
                    </Button>
                  </Paper>
                ) : (
                  <Box
                    component="section"
                    aria-label="Rezultate medici"
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                      gap: 2.25,
                      mt: 2.25,
                    }}
                  >
                    {filteredDoctors.map((doctor) => (
                      <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        onViewProfile={handleViewProfile}
                      />
                    ))}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{ borderTop: 1, borderColor: "divider", bgcolor: "background.paper" }}
        >
          <Box
            sx={{
              ...CONTAINER_SX,
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              py: 2.25,
              flexWrap: "wrap",
            }}
          >
            <Typography variant="caption">
              © {new Date().getFullYear()} MediSearch • Doar date mock
            </Typography>
            <Typography variant="caption" color="text.secondary">
              React + Vite + MUI
            </Typography>
          </Box>
        </Box>

      </Box>
    </ThemeProvider>
  );
}
