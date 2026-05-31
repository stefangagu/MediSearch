import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Stars({ value }) {
  const rounded = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rounded ? "★" : "☆"
  ).join("");

  return (
    <Typography component="span" color="primary">
      {stars}
    </Typography>
  );
}

export default function DoctorCard({ doctor, onViewProfile }) {
  const rating =
    Number.isFinite(doctor.rating) ? doctor.rating : null;

  const reviewCount =
    Number.isFinite(doctor.reviewCount)
      ? doctor.reviewCount
      : doctor.reviews?.length ?? 0;

  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: "14px", display: "flex", flexDirection: "column", height: "100%" }}
    >
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "16px", fontWeight: 700, letterSpacing: "-0.2px", mb: 0 }}
        >
          {doctor.name}
        </Typography>

        <Chip
          label={doctor.specialty}
          color="primary"
          variant="outlined"
          size="small"
        />

        {rating != null && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" fontWeight={800}>
                {rating.toFixed(1)}
              </Typography>
              <Stars value={rating} />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {reviewCount} recenzii
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gap: 1.25,
            pt: 1.5,
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
              Clinică
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "13px", textAlign: "right" }}>
              {doctor.clinic}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: "13px" }}>
              Locație
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "13px", textAlign: "right" }}>
              {doctor.location}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <CardActions sx={{ pt: 0, px: 2, pb: 2 }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => onViewProfile(doctor.id)}
        >
          Vezi profilul
        </Button>
      </CardActions>
    </Card>
  );
}
