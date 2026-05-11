"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2, X } from "lucide-react";
import {
  type AddressSuggestion,
  searchAddresses,
} from "@/lib/calculator/geocoding";

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: AddressSuggestion) => void;
  placeholder?: string;
}

const DEBOUNCE_MS = 280;

const AddressAutocomplete = ({
  value,
  onChange,
  onSelect,
  placeholder,
}: AddressAutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = value.trim();
    if (query.length < 3) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      setError(null);
      try {
        const result = await searchAddresses(query, controller.signal);
        setSuggestions(result);
        setOpen(true);
      } catch (e) {
        if ((e as Error).name !== "AbortError") {
          setError("Adress-Suche aktuell nicht erreichbar.");
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSelect = (suggestion: AddressSuggestion) => {
    onChange(suggestion.label);
    onSelect(suggestion);
    setOpen(false);
    setSuggestions([]);
  };

  const handleClear = () => {
    onChange("");
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <MapPin
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary pointer-events-none"
          aria-hidden
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder ?? "Straße, Hausnummer, PLZ Ort"}
          className="w-full bg-card border border-outline-variant/40 pl-12 pr-12 py-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
          autoComplete="street-address"
          aria-label="Adresse für Standort-Analyse"
        />
        {loading ? (
          <Loader2
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-spin"
            aria-hidden
          />
        ) : value ? (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:text-foreground transition-colors"
            aria-label="Adresse löschen"
          >
            <X className="w-5 h-5" />
          </button>
        ) : null}
      </div>

      {open && suggestions.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-30 left-0 right-0 top-full mt-2 bg-surface border border-outline-variant/40 shadow-lg max-h-80 overflow-y-auto"
        >
          {suggestions.map((s) => (
            <li key={s.osmId}>
              <button
                type="button"
                onClick={() => handleSelect(s)}
                className="w-full text-left px-4 py-3 hover:bg-card border-b border-outline-variant/20 last:border-b-0 flex items-start gap-3 transition-colors"
              >
                <MapPin
                  className="w-4 h-4 text-primary mt-0.5 shrink-0"
                  aria-hidden
                />
                <span className="flex-1 min-w-0">
                  <span className="block font-medium text-foreground truncate">
                    {s.street || s.label.split(",")[0]}
                  </span>
                  <span className="block text-xs text-secondary mt-0.5 truncate">
                    {[s.postcode, s.city, s.state].filter(Boolean).join(" · ")}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-xs text-primary mt-2">
          {error} Bitte später erneut versuchen oder Adresse manuell eingeben.
        </p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
