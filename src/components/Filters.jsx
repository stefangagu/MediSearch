import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import GridViewIcon from "@mui/icons-material/GridView";
import TableRowsIcon from "@mui/icons-material/TableRows";
import FilterListIcon from "@mui/icons-material/FilterList";
import Dropdown from "./Dropdown.jsx";
import { SPECIALTY_COLORS } from "../data/specialtyColors.js";
import { RATING_FILTERS } from "../data/ratingFilters.js";

export default function Filters({
  selectedSpecialties,
  allSpecialties,
  onToggleSpecialty,
  selectedRatings,
  onToggleRating,
  onClear,
  resultsCount,
  viewMode,
  onViewModeChange
}) {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const selectedCount = selectedSpecialties.length;
  const totalActiveFilters = selectedSpecialties.length + selectedRatings.length;

  const filteredSpecialties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSpecialties;
    return allSpecialties.filter((s) => s.toLowerCase().includes(q));
  }, [allSpecialties, query]);

  const specialtiesBody = (
    <>
      <TextField
        id="specialtySearch"
        label="Caută în listă"
        fullWidth
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />

      <Box
        role="list"
        sx={{
          mt: 1.5,
          border: 1,
          borderColor: "divider",
          maxHeight: 260,
          overflow: "auto",
          p: 1,
          display: "grid",
          gap: 0.75,
        }}
      >
        {filteredSpecialties.map((s) => {
          const checked = selectedSpecialties.includes(s);
          return (
            <FormControlLabel
              key={s}
              role="listitem"
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={() => onToggleSpecialty(s)}
                  sx={{ color: "primary.main" }}
                />
              }
              label={
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                  <Typography variant="body2">{s}</Typography>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: "3px",
                      bgcolor: SPECIALTY_COLORS[s] ?? "#6b7280",
                      flexShrink: 0,
                    }}
                  />
                </Box>
              }
              sx={{
                m: 0,
                px: 1,
                py: 0.75,
                width: "100%",
                "& .MuiFormControlLabel-label": { flex: 1 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            />
          );
        })}
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          Sfat: selectează mai multe specializări pentru rezultate mai largi.
        </Typography>
      </Box>
    </>
  );

  const ratingBody = (
    <>
      <Box role="list" sx={{ display: "grid", gap: 0.75 }}>
        {RATING_FILTERS.map((r) => {
          const checked = selectedRatings.includes(r.id);
          return (
            <FormControlLabel
              key={r.id}
              role="listitem"
              control={
                <Checkbox
                  size="small"
                  checked={checked}
                  onChange={() => onToggleRating(r.id)}
                  sx={{ color: "primary.main" }}
                />
              }
              label={<Typography variant="body2">{r.label}</Typography>}
              sx={{
                m: 0,
                px: 1,
                py: 0.75,
                width: "100%",
                "& .MuiFormControlLabel-label": { flex: 1 },
                "&:hover": { bgcolor: "action.hover" },
              }}
            />
          );
        })}
      </Box>

      <Box sx={{ mt: 1.5 }}>
        <Typography variant="caption" color="text.secondary">
          Sfat: medicii fără recenzii nu vor apărea dacă filtrezi după rating.
        </Typography>
      </Box>
    </>
  );

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <Dropdown
          id="specialties-panel"
          ariaLabel="Selectează specializări"
          trigger={({ isOpen, toggle, triggerRef }) => (
            <Badge
              badgeContent={selectedCount > 0 ? selectedCount : null}
              color="primary"
              sx={{ "& .MuiBadge-badge": { top: 8, right: -4 } }}
            >
              <Button
                ref={triggerRef}
                variant="outlined"
                size="large"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="specialties-panel"
                onClick={toggle}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Specializări
              </Button>
            </Badge>
          )}
        >
          {({ close }) => (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Specializări
                </Typography>
                <IconButton size="small" onClick={close} aria-label="Închide">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              {specialtiesBody}
            </>
          )}
        </Dropdown>

        <Dropdown
          id="rating-panel"
          ariaLabel="Filtrează după rating"
          trigger={({ isOpen, toggle, triggerRef }) => (
            <Badge
              badgeContent={selectedRatings.length > 0 ? selectedRatings.length : null}
              color="primary"
              sx={{ "& .MuiBadge-badge": { top: 8, right: -4 } }}
            >
              <Button
                ref={triggerRef}
                variant="outlined"
                size="large"
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="rating-panel"
                onClick={toggle}
                endIcon={<KeyboardArrowDownIcon />}
              >
                Rating
              </Button>
            </Badge>
          )}
        >
          {({ close }) => (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={800}>
                  Rating
                </Typography>
                <IconButton size="small" onClick={close} aria-label="Închide">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              {ratingBody}
            </>
          )}
        </Dropdown>

        <Button variant="outlined" size="large" onClick={onClear}>
          Resetează filtrele
        </Button>
      </Box>

      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <Badge
          badgeContent={totalActiveFilters > 0 ? totalActiveFilters : null}
          color="primary"
          sx={{ "& .MuiBadge-badge": { top: 4, right: 4 } }}
        >
          <IconButton
            onClick={() => setFiltersOpen(true)}
            aria-label="Filtre"
            aria-haspopup="dialog"
            aria-expanded={filtersOpen}
            aria-controls="filters-drawer"
            sx={{ border: 1, borderColor: "divider", borderRadius: 1, height: 40, width: 40 }}
          >
            <FilterListIcon fontSize="small" />
          </IconButton>
        </Badge>
      </Box>

      <Drawer
        id="filters-drawer"
        anchor="right"
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        slotProps={{ paper: { sx: { width: { xs: "100%", sm: 360 }, p: 2.5 } } }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={800}>
            Filtre
          </Typography>
          <IconButton size="small" onClick={() => setFiltersOpen(false)} aria-label="Închide">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
          Specializări
        </Typography>
        {specialtiesBody}

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
          Rating
        </Typography>
        {ratingBody}

        <Divider sx={{ my: 2 }} />

        <Button variant="outlined" size="large" fullWidth onClick={onClear}>
          Resetează filtrele
        </Button>
      </Drawer>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(e, value) => {
            if (value !== null) onViewModeChange(value);
          }}
          size="small"
          aria-label="Mod de afișare"
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <ToggleButton value="grid" aria-label="Vizualizare tip grilă" sx={{ height: 40 }}>
            <GridViewIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="table" aria-label="Vizualizare tip tabel" sx={{ height: 40 }}>
            <TableRowsIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>

        <Typography
          variant="body2"
          color="text.secondary"
          aria-live="polite"
          sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          {resultsCount} {resultsCount === 1 ? "rezultat" : "rezultate"}
        </Typography>
      </Box>
    </>
  );
}
