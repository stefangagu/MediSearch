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
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Dropdown from "./Dropdown.jsx";
import { SPECIALTY_COLORS } from "../data/specialtyColors.js";

export default function Filters({
  selectedSpecialties,
  allSpecialties,
  onToggleSpecialty,
  onClear,
  resultsCount
}) {
  const [query, setQuery] = useState("");
  const selectedCount = selectedSpecialties.length;

  const filteredSpecialties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSpecialties;
    return allSpecialties.filter((s) => s.toLowerCase().includes(q));
  }, [allSpecialties, query]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
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
          )}
        </Dropdown>

        <Button variant="outlined" size="large" onClick={onClear}>
          Resetează filtrele
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        aria-live="polite"
        sx={{ whiteSpace: "nowrap", flexShrink: 0, ml: "auto" }}
      >
        {resultsCount} {resultsCount === 1 ? "rezultat" : "rezultate"}
      </Typography>
    </>
  );
}
