import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stars from "./Stars.jsx";
import { getDoctorRating, getDoctorReviewCount } from "../utils/doctorUtils.js";

function formatDateRO(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ro-RO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
  } catch {
    return iso;
  }
}

export default function DoctorProfile({ doctor, onBack }) {
  const rating = getDoctorRating(doctor);
  const reviewCount = getDoctorReviewCount(doctor);

  const reviews = useMemo(() => {
    const list = Array.isArray(doctor.reviews) ? doctor.reviews : [];
    return [...list].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }, [doctor.reviews]);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Button
        type="button"
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ justifySelf: "start" }}
      >
        Înapoi
      </Button>

      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
            pb: 2.5,
            borderBottom: 1,
            borderColor: "divider",
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.3px", fontSize: "20px" }}>
              {doctor.name}
            </Typography>
            <Typography color="primary" sx={{ fontWeight: 700, fontSize: "14px" }}>
              {doctor.specialty}
            </Typography>
          </Box>

          <Paper
            variant="outlined"
            aria-label="Rating"
            sx={{
              borderRadius: "14px",
              px: 1.75,
              py: 1.5,
              textAlign: { xs: "left", sm: "right" },
              minWidth: { sm: 160 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            {rating != null ? (
              <>
                <Typography fontWeight={900} fontSize="18px">
                  {rating.toFixed(1)}
                </Typography>
                <Stars value={rating} />
                <Typography variant="caption" color="text.secondary">
                  {reviewCount} recenzii
                </Typography>
              </>
            ) : (
              <Typography variant="caption" color="text.secondary">
                Fără rating
              </Typography>
            )}
          </Paper>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 2.5,
            pt: 2.5,
          }}
        >
          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Clinică
            </Typography>
            <Typography variant="body2">{doctor.clinic}</Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Locație
            </Typography>
            <Typography variant="body2">{doctor.location}</Typography>
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "16px", letterSpacing: "-0.2px", mb: 0.5 }}>
              Recenzii
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              În viitor: agregăm recenzii din internet (surse multiple) și le normalizăm într-un scor unitar.
            </Typography>
          </Box>

          {reviews.length === 0 ? (
            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography fontWeight={800} sx={{ mb: 0.75 }}>
                Încă nu există recenzii afișate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                Acesta este un profil mock. Vom popula ulterior cu recenzii colectate din surse publice.
              </Typography>
            </Paper>
          ) : (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              {reviews.map((r) => (
                <Paper
                  key={r.id}
                  component="article"
                  variant="outlined"
                  sx={{ p: 2 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 1.25,
                    }}
                  >
                    <Typography fontWeight={800} sx={{ fontSize: "13px" }}>
                      {r.author || "Anonim"}
                    </Typography>
                    <Box
                      sx={{
                        display: "grid",
                        justifyItems: { xs: "flex-start", sm: "flex-end" },
                        gap: 0.75,
                      }}
                    >
                      <Stars value={r.rating || 0} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDateRO(r.date)}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ lineHeight: 1.55 }}>
                    {r.text}
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
