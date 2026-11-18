"use client";

import { useState, type FormEvent } from "react";
import { teamMembers } from "@/config/pages";
import { COUNTRY_CODES } from "@/lib/consult-schema";

export function ConsultForm({
  locationId,
  locationCity,
}: {
  locationId: string;
  locationCity: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<string>(COUNTRY_CODES[0].code);
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [doctor, setDoctor] = useState<string>(teamMembers[0].name);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setFieldErrors({});

    try {
      const res = await fetch("/api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationId,
          name,
          email,
          countryCode,
          phone,
          streetAddress,
          city,
          state,
          postalCode,
          doctor,
          message,
          website,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setFormError(data.message || "Unable to submit your request.");
        if (data.errors) setFieldErrors(data.errors);
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="mx-auto max-w-xl border border-[var(--line-dark)] bg-black/40 p-8 text-center"
      >
        <h2 className="text-2xl">Consultation Request Received</h2>
        <p className="mt-3 text-white/80">
          Thank you. Our {locationCity} studio team will contact you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mx-auto max-w-xl space-y-5 border border-[#C9A96E]/30 bg-[#111110] p-6 md:p-10 shadow-[0_24px_70px_rgba(0,0,0,0.5)]"
    >
      {formError && (
        <div
          role="alert"
          className="border border-red-400 bg-red-950/60 p-4 text-sm text-red-100"
        >
          {formError}
        </div>
      )}

      {/* Honeypot field for spam bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="consult-website">Website</label>
        <input
          id="consult-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="consult-name"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85"
        >
          First and Last Name *
        </label>
        <input
          id="consult-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? "err-name" : undefined}
          className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
        />
        {fieldErrors.name && (
          <p id="err-name" role="alert" className="mt-1.5 text-sm text-red-300">
            {fieldErrors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="consult-email"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85"
        >
          Email *
        </label>
        <input
          id="consult-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "err-email" : undefined}
          className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
        />
        {fieldErrors.email && (
          <p id="err-email" role="alert" className="mt-1.5 text-sm text-red-300">
            {fieldErrors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="consult-phone"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85"
        >
          Phone *
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_1fr]">
          <select
            id="consult-country"
            name="countryCode"
            aria-label="Country dialing code"
            autoComplete="tel-country-code"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-3 py-3 text-[#FAF8F4] transition-colors focus:border-[#C9A96E] focus:outline-none"
          >
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            id="consult-phone"
            name="phone"
            type="tel"
            autoComplete="tel-national"
            required
            placeholder="(000) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
            className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
          />
        </div>
        {fieldErrors.phone && (
          <p id="err-phone" role="alert" className="mt-1.5 text-sm text-red-300">
            {fieldErrors.phone}
          </p>
        )}
      </div>

      <fieldset className="space-y-3">
        <legend className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85">
          Address *
        </legend>
        <div>
          <input
            id="consult-street"
            name="streetAddress"
            type="text"
            autoComplete="street-address"
            required
            aria-label="Street Address"
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            aria-invalid={Boolean(fieldErrors.streetAddress)}
            aria-describedby={
              fieldErrors.streetAddress ? "err-street" : undefined
            }
            className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
          />
          {fieldErrors.streetAddress && (
            <p
              id="err-street"
              role="alert"
              className="mt-1.5 text-sm text-red-300"
            >
              {fieldErrors.streetAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <input
              id="consult-city"
              name="city"
              type="text"
              autoComplete="address-level2"
              required
              aria-label="City"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-invalid={Boolean(fieldErrors.city)}
              aria-describedby={fieldErrors.city ? "err-city" : undefined}
              className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
            />
            {fieldErrors.city && (
              <p
                id="err-city"
                role="alert"
                className="mt-1.5 text-sm text-red-300"
              >
                {fieldErrors.city}
              </p>
            )}
          </div>
          <div>
            <input
              id="consult-state"
              name="state"
              type="text"
              autoComplete="address-level1"
              required
              aria-label="State or Region"
              placeholder="State / Region"
              value={state}
              onChange={(e) => setState(e.target.value)}
              aria-invalid={Boolean(fieldErrors.state)}
              aria-describedby={fieldErrors.state ? "err-state" : undefined}
              className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
            />
            {fieldErrors.state && (
              <p
                id="err-state"
                role="alert"
                className="mt-1.5 text-sm text-red-300"
              >
                {fieldErrors.state}
              </p>
            )}
          </div>
          <div>
            <input
              id="consult-postal"
              name="postalCode"
              type="text"
              autoComplete="postal-code"
              required
              aria-label="ZIP or Postal Code"
              placeholder="ZIP / Postal"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              aria-invalid={Boolean(fieldErrors.postalCode)}
              aria-describedby={
                fieldErrors.postalCode ? "err-postal" : undefined
              }
              className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
            />
            {fieldErrors.postalCode && (
              <p
                id="err-postal"
                role="alert"
                className="mt-1.5 text-sm text-red-300"
              >
                {fieldErrors.postalCode}
              </p>
            )}
          </div>
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="consult-doctor"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85"
        >
          Select a Doctor *
        </label>
        <select
          id="consult-doctor"
          name="doctor"
          required
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
          className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
        >
          {teamMembers.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="consult-message"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[2px] text-white/85"
        >
          Message
        </label>
        <textarea
          id="consult-message"
          name="message"
          rows={4}
          placeholder="Tell us about your smile goals or preferred consultation dates"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-[#C9A96E]/25 bg-[#1A1A18] px-4 py-3 text-[#FAF8F4] placeholder:text-white/40 transition-colors focus:border-[#C9A96E] focus:outline-none"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="min-h-[48px] w-full border border-[#C9A96E] bg-[#C9A96E] px-6 py-3 font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-[2px] text-[#090908] shadow-[0_8px_24px_rgba(201,169,110,0.22)] transition-colors hover:border-[#DFC38C] hover:bg-[#DFC38C] disabled:opacity-50 cursor-pointer"
        >
          {submitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
