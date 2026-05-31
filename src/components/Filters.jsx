import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";
import Dropdown from "./Dropdown.jsx";

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
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        p: "14px 20px",
        borderRadius: "14px",
        mt: 2.25,
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
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
                aria-haspopup="dialog"
                aria-expanded={isOpen}
                aria-controls="specialties-panel"
                onClick={toggle}
                endIcon={
                  <span aria-hidden="true" style={{ fontSize: 12, color: "inherit", lineHeight: 1 }}>
                    ▾
                  </span>
                }
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
                  borderRadius: "12px",
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
                      label={<Typography variant="body2">{s}</Typography>}
                      sx={{
                        m: 0,
                        px: 1,
                        py: 0.75,
                        borderRadius: "10px",
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

        <Button variant="outlined" onClick={onClear}>
          Resetează filtrele
        </Button>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        aria-live="polite"
        sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
      >
        {resultsCount} {resultsCount === 1 ? "rezultat" : "rezultate"}
      </Typography>
    </Paper>
  );
}
