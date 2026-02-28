import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Filters({
  selectedSpecialties,
  allSpecialties,
  onToggleSpecialty,
  onClear,
  resultsCount
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const selectedCount = selectedSpecialties.length;

  // Filter the long list inside the dropdown
  const filteredSpecialties = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allSpecialties;
    return allSpecialties.filter((s) => s.toLowerCase().includes(q));
  }, [allSpecialties, query]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // When opening, focus the search input for faster use
  useEffect(() => {
    if (!isOpen) return;
    // tiny delay to ensure panel is mounted
    const t = setTimeout(() => {
      panelRef.current?.querySelector("input")?.focus();
    }, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  return (
    <div className="filtersRow filtersRowDropdown">
      <div className="filtersLeft">
        {/* Dropdown trigger */}
        <div className="dropdown" ref={wrapRef}>
          <button
            ref={buttonRef}
            type="button"
            className="btn btnSecondary dropdownTrigger"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls="specialties-panel"
            onClick={() => setIsOpen((v) => !v)}
          >
            Specializări
            {selectedCount > 0 && (
              <span className="badge" aria-label={`${selectedCount} selectate`}>
                {selectedCount}
              </span>
            )}
            <span className="chevron" aria-hidden="true">
              ▾
            </span>
          </button>

          {isOpen && (
            <div
              id="specialties-panel"
              className="dropdownPanel"
              role="dialog"
              aria-label="Selectează specializări"
              ref={panelRef}
            >
              <div className="dropdownHeader">
                <div className="dropdownTitle">Specializări</div>
                <button
                  type="button"
                  className="btn btnSecondary btnSmall"
                  onClick={() => setIsOpen(false)}
                >
                  Închide
                </button>
              </div>

              <label className="srOnly" htmlFor="specialtySearch">
                Caută în listă
              </label>
              <input
                id="specialtySearch"
                className="specialtySearch"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută în listă…"
                autoComplete="off"
              />

              <div className="specialtiesList" role="list">
                {filteredSpecialties.map((s) => {
                  const checked = selectedSpecialties.includes(s);
                  return (
                    <label key={s} className="checkboxRow" role="listitem">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => onToggleSpecialty(s)}
                      />
                      <span className="checkboxLabel">{s}</span>
                    </label>
                  );
                })}
              </div>

              <div className="dropdownFooter">
                <span className="mutedNote">
                  Sfat: selectează mai multe specializări pentru rezultate mai
                  largi.
                </span>
              </div>
            </div>
          )}
        </div>

        <button type="button" className="btn btnSecondary" onClick={onClear}>
          Resetează filtrele
        </button>
      </div>

      <div className="resultsCount" aria-live="polite">
        {resultsCount} {resultsCount === 1 ? "rezultat" : "rezultate"}
      </div>
    </div>
  );
}