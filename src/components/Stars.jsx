import React from "react";
import Typography from "@mui/material/Typography";

export default function Stars({ value }) {
  const full = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? "★" : "☆")).join("");
  return (
    <Typography component="span" color="primary" aria-label={`${value} din 5`}>
      {stars}
    </Typography>
  );
}
