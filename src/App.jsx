import React, { useCallback, useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import Filters from "./components/Filters.jsx";
import DoctorCard from "./components/DoctorCard.jsx";
import DoctorProfile from "./components/DoctorProfile.jsx";
import { doctors } from "./data/doctors.js";
import { specialtiesRO } from "./data/specialtiesRO.js";

function getDoctorIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("doctor");
  const id = raw ? Number(raw) : null;
  return Number.isFinite(id) ? id : null;
}

function setDoctorIdInUrl(id) {
  const url = new URL(window.location.href);
  if (id == null) url.searchParams.delete("doctor");
  else url.searchParams.set("doctor", String(id));
  window.history.pushState({}, "", url);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [activeDoctorId, setActiveDoctorId] = useState(() => getDoctorIdFromUrl());

  // Keep state in sync with browser navigation (back/forward)
  useEffect(() => {
    const onPopState = () => setActiveDoctorId(getDoctorIdFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const normalizedQuery = useMemo(() => search.trim().toLowerCase(), [search]);

  const handleToggleSpecialty = useCallback((specialty) => {
    setSelectedSpecialties((prev) => {
      if (prev.includes(specialty)) return prev.filter((x) => x !== specialty);
      return [...prev, specialty];
    });
  }, []);

  const handleClear = useCallback(() => {
    setSearch("");
    setSelectedSpecialties([]);
  }, []);

  const handleViewProfile = useCallback((id) => {
    setDoctorIdInUrl(id);
    setActiveDoctorId(id);
  }, []);

  const handleBackToList = useCallback(() => {
    setDoctorIdInUrl(null);
    setActiveDoctorId(null);
  }, []);

  const activeDoctor = useMemo(() => {
    if (activeDoctorId == null) return null;
    return doctors.find((d) => d.id === activeDoctorId) || null;
  }, [activeDoctorId]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((d) => {
      const matchesSpecialty =
        selectedSpecialties.length === 0
          ? true
          : selectedSpecialties.includes(d.specialty);

      if (!matchesSpecialty) return false;
      if (!normalizedQuery) return true;

      const haystack =
        `${d.name} ${d.specialty} ${d.clinic} ${d.location}`.toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [selectedSpecialties, normalizedQuery]);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="logo" aria-hidden="true">
              M
            </div>
            <div>
              <h1 className="title">MediSearch</h1>
              <p className="subtitle">
                Director medical minimalist cu căutare rapidă și filtre pe specializări.
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {activeDoctor ? (
            <DoctorProfile doctor={activeDoctor} onBack={handleBackToList} />
          ) : (
            <>
              <SearchBar value={search} onChange={setSearch} />

              <Filters
                selectedSpecialties={selectedSpecialties}
                allSpecialties={specialtiesRO}
                onToggleSpecialty={handleToggleSpecialty}
                onClear={handleClear}
                resultsCount={filteredDoctors.length}
              />

              {filteredDoctors.length === 0 ? (
                <div className="emptyState" role="status" aria-live="polite">
                  <h2 className="emptyTitle">Nu am găsit rezultate</h2>
                  <p className="emptyText">
                    Încearcă alt nume/locație/clinică sau debifează unele specializări.
                  </p>
                  <button
                    type="button"
                    className="btn btnSecondary"
                    onClick={handleClear}
                  >
                    Resetează
                  </button>
                </div>
              ) : (
                <section className="grid" aria-label="Rezultate medici">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      onViewProfile={handleViewProfile}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container footerInner">
          <p className="footerText">
            © {new Date().getFullYear()} MediSearch • Doar date mock
          </p>
          <p className="footerTextMuted">React + Vite</p>
        </div>
      </footer>
    </div>
  );
}