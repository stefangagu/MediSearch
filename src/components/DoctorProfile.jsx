import React, { useMemo } from "react";

function formatDateRO(iso) {
  // Minimal date formatting without libs
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ro-RO", { year: "numeric", month: "short", day: "2-digit" }).format(d);
  } catch {
    return iso;
  }
}

function Stars({ value }) {
  const full = Math.round(value);
  const stars = Array.from({ length: 5 }, (_, i) => (i < full ? "★" : "☆")).join("");
  return (
    <span className="stars" aria-label={`${value} din 5`}>
      {stars}
    </span>
  );
}

export default function DoctorProfile({ doctor, onBack }) {
  const rating = Number.isFinite(doctor.rating) ? doctor.rating : null;
  const reviewCount = Number.isFinite(doctor.reviewCount) ? doctor.reviewCount : (doctor.reviews?.length ?? 0);

  // Sort reviews newest-first (stable + memoized)
  const reviews = useMemo(() => {
    const list = Array.isArray(doctor.reviews) ? doctor.reviews : [];
    return [...list].sort((a, b) => String(b.date).localeCompare(String(a.date)));
  }, [doctor.reviews]);

  return (
    <div className="profile">
      <div className="profileTop">
        <button type="button" className="btn btnSecondary" onClick={onBack}>
          ← Înapoi
        </button>
      </div>

      <div className="profileCard">
        <div className="profileHeader">
          <div className="profileHeaderLeft">
            <h2 className="profileName">{doctor.name}</h2>
            <p className="profileSpecialty">{doctor.specialty}</p>
          </div>

          <div className="ratingBox" aria-label="Rating">
            {rating != null ? (
              <>
                <div className="ratingValue">{rating.toFixed(1)}</div>
                <Stars value={rating} />
                <div className="ratingMeta">{reviewCount} recenzii</div>
              </>
            ) : (
              <>
                <div className="ratingMeta">Fără rating</div>
              </>
            )}
          </div>
        </div>

        <div className="profileGrid">
          <div className="profileField">
            <div className="profileLabel">Clinică</div>
            <div className="profileValue">{doctor.clinic}</div>
          </div>

          <div className="profileField">
            <div className="profileLabel">Locație</div>
            <div className="profileValue">{doctor.location}</div>
          </div>
        </div>

        <section className="reviews">
          <div className="reviewsHeader">
            <h3 className="reviewsTitle">Recenzii</h3>
            <p className="reviewsSubtitle">
              În viitor: agregăm recenzii din internet (surse multiple) și le normalizăm într-un scor unitar.
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="reviewsEmpty">
              <div className="reviewsEmptyTitle">Încă nu există recenzii afișate</div>
              <div className="reviewsEmptyText">
                Acesta este un profil mock. Vom popula ulterior cu recenzii colectate din surse publice.
              </div>
            </div>
          ) : (
            <div className="reviewsList">
              {reviews.map((r) => (
                <article key={r.id} className="reviewCard">
                  <div className="reviewTop">
                    <div className="reviewAuthor">{r.author || "Anonim"}</div>
                    <div className="reviewRight">
                      <Stars value={r.rating || 0} />
                      <div className="reviewDate">{formatDateRO(r.date)}</div>
                    </div>
                  </div>
                  <p className="reviewText">{r.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}