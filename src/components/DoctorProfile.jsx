import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Stars from "./Stars.jsx";
import { SPECIALTY_COLORS } from "../data/specialtyColors.js";
import { getDoctorRating, getDoctorReviewCount, getDoctorClinics } from "../utils/doctorUtils.js";

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
  const clinics = getDoctorClinics(doctor);

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
            gap: 1.5,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "-0.3px", fontSize: "20px" }}>
            {doctor.name}
          </Typography>
          <Chip
            label={doctor.specialty}
            size="small"
            sx={{
              bgcolor: SPECIALTY_COLORS[doctor.specialty] ?? "#6b7280",
              color: "#fff",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1.5,
            pb: 2.5,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {rating != null ? (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontWeight={800} fontSize="18px">
                  {rating.toFixed(1)}
                </Typography>
                <Stars value={rating} />
              </Box>
              <Typography variant="body2" color="text.secondary">
                {reviewCount} recenzii
              </Typography>
            </>
          ) : (
            <Typography variant="body2" color="text.disabled">
              Nicio recenzie încă
            </Typography>
          )}
        </Box>

        <Box sx={{ pt: 2.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
            {clinics.length > 1 ? "Clinici" : "Clinică"}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(280px, 1fr))" },
              gap: 2,
            }}
          >
            {clinics.map((clinic, i) => (
              <Box key={i}>
                <Typography variant="body2" fontWeight={700}>
                  {clinic.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {clinic.address}
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 1,
                    overflow: "hidden",
                    lineHeight: 0,
                  }}
                >
                  <iframe
                    title={`Hartă ${clinic.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(clinic.address)}&output=embed`}
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontSize: "16px", letterSpacing: "-0.2px", mb: 0.5 }}>
              Recenzii
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              În curând: recenzii agregate din mai multe surse, într-un scor unitar.
            </Typography>
          </Box>

          {reviews.length === 0 ? (
            <Paper
              variant="outlined"
              role="status"
              aria-label="Nicio recenzie disponibilă"
              sx={{ p: { xs: 3, sm: 4 }, textAlign: "center" }}
            >
              <RateReviewOutlinedIcon
                aria-hidden="true"
                sx={{ fontSize: 40, color: "text.disabled", mb: 1.5 }}
              />
              <Typography fontWeight={700} sx={{ mb: 0.75 }}>
                Nicio recenzie încă
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.6, maxWidth: 360, mx: "auto" }}
              >
                Nu am găsit recenzii pentru acest medic. În viitor vom agrega recenzii din surse publice verificate.
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
