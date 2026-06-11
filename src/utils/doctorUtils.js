export function getDoctorRating(doctor) {
  return Number.isFinite(doctor.rating) ? doctor.rating : null;
}

export function getDoctorReviewCount(doctor) {
  return Number.isFinite(doctor.reviewCount)
    ? doctor.reviewCount
    : (doctor.reviews?.length ?? 0);
}

export function getDoctorClinics(doctor) {
  return Array.isArray(doctor.clinics) ? doctor.clinics : [];
}

export function getDoctorCities(doctor) {
  const cities = getDoctorClinics(doctor).map((c) => c.city);
  return [...new Set(cities)];
}

export function getDoctorCityLabel(doctor) {
  return getDoctorCities(doctor).join(", ");
}

export function getPrimaryClinicName(doctor) {
  return getDoctorClinics(doctor)[0]?.name ?? "";
}
