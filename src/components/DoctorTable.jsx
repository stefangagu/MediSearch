import React, { useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SPECIALTY_COLORS } from "../data/specialtyColors.js";
import Stars from "./Stars.jsx";
import { getDoctorRating, getDoctorReviewCount } from "../utils/doctorUtils.js";

const COLUMNS = [
  { id: "name", label: "Nume" },
  { id: "specialty", label: "Specializare" },
  { id: "clinic", label: "Clinică" },
  { id: "location", label: "Locație" },
  { id: "rating", label: "Rating" },
  { id: "actions", label: "Acțiune", sortable: false },
];

export default function DoctorTable({ doctors, onViewProfile }) {
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState("asc");

  const handleSort = (columnId) => {
    if (orderBy === columnId) {
      setOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(columnId);
      setOrder("asc");
    }
  };

  const sortedDoctors = useMemo(() => {
    const sorted = [...doctors].sort((a, b) => {
      let cmp;
      if (orderBy === "rating") {
        const ra = getDoctorRating(a) ?? -1;
        const rb = getDoctorRating(b) ?? -1;
        cmp = ra - rb;
      } else {
        cmp = String(a[orderBy] ?? "").localeCompare(String(b[orderBy] ?? ""), "ro");
      }
      return order === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [doctors, orderBy, order]);

  return (
    <TableContainer component={Paper} variant="outlined" sx={{ mt: 2.25 }}>
      <Table
        aria-label="Tabel medici"
        size="small"
        sx={{ "& .MuiTableCell-root": { py: 1.5 } }}
      >
        <TableHead>
          <TableRow>
            {COLUMNS.map((col) => (
              <TableCell key={col.id}>
                {col.sortable === false ? (
                  col.label
                ) : (
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? order : "asc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedDoctors.map((doctor) => {
            const rating = getDoctorRating(doctor);
            const reviewCount = getDoctorReviewCount(doctor);
            return (
              <TableRow key={doctor.id} hover>
                <TableCell sx={{ fontWeight: 700 }}>{doctor.name}</TableCell>
                <TableCell>
                  <Chip
                    label={doctor.specialty}
                    size="small"
                    sx={{
                      bgcolor: SPECIALTY_COLORS[doctor.specialty] ?? "#6b7280",
                      color: "#fff",
                    }}
                  />
                </TableCell>
                <TableCell>{doctor.clinic}</TableCell>
                <TableCell>{doctor.location}</TableCell>
                <TableCell>
                  {rating != null ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" fontWeight={800}>
                        {rating.toFixed(1)}
                      </Typography>
                      <Stars value={rating} />
                      <Typography variant="caption" color="text.secondary">
                        ({reviewCount})
                      </Typography>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.disabled">
                      Nicio recenzie încă
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => onViewProfile(doctor.id)}
                  >
                    Vezi profilul
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
