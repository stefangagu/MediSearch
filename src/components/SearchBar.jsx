import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label className="srOnly" htmlFor="search">
        Caută medici
      </label>

      <div className="searchInputWrap">
        <span className="searchIcon" aria-hidden="true">
          ⌕
        </span>
        <input
          id="search"
          className="searchInput"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Caută după nume, specialitate, clinică sau locație…"
          autoComplete="off"
          inputMode="search"
        />
      </div>

      <p className="searchHint">
        Exemplu: „București”, „Cardiologie” sau numele unei clinici.
      </p>
    </div>
  );
}