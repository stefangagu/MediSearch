import React from "react";

function Stars({ value }) {
  const rounded = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < rounded ? "★" : "☆"
  ).join("");

  return <span className="stars">{stars}</span>;
}

export default function DoctorCard({ doctor, onViewProfile }) {
  const rating =
    Number.isFinite(doctor.rating) ? doctor.rating : null;

  const reviewCount =
    Number.isFinite(doctor.reviewCount)
      ? doctor.reviewCount
      : doctor.reviews?.length ?? 0;

  return (
    <article className="card">
      <div className="cardTop">
        <h3 className="cardTitle">{doctor.name}</h3>
        <p className="cardSpecialty">{doctor.specialty}</p>
      </div>

      {rating != null && (
        <div className="cardRating">
          <div className="cardRatingLeft">
            <span className="cardRatingValue">
              {rating.toFixed(1)}
            </span>
            <Stars value={rating} />
          </div>
          <div className="cardRatingCount">
            {reviewCount} recenzii
          </div>
        </div>
      )}

      <div className="cardMeta">
        <div className="metaRow">
          <span className="metaLabel">Clinică</span>
          <span className="metaValue">{doctor.clinic}</span>
        </div>
        <div className="metaRow">
          <span className="metaLabel">Locație</span>
          <span className="metaValue">{doctor.location}</span>
        </div>
      </div>

      <div className="cardFooter">
        <button
          type="button"
          className="btn btnPrimary"
          onClick={() => onViewProfile(doctor.id)}
        >
          Vezi profilul
        </button>
      </div>
    </article>
  );
}