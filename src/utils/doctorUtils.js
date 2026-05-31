export function getDoctorRating(doctor) {
  return Number.isFinite(doctor.rating) ? doctor.rating : null;
}

export function getDoctorReviewCount(doctor) {
  return Number.isFinite(doctor.reviewCount)
    ? doctor.reviewCount
    : (doctor.reviews?.length ?? 0);
}
