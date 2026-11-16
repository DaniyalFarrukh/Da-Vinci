import { z } from "zod";

export const COUNTRY_CODES = [
  { code: "+1", label: "US / Canada (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+33", label: "France (+33)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+92", label: "Pakistan (+92)" },
] as const;

export const consultSchema = z.object({
  locationId: z.string().trim().min(1, "Please select a studio location."),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name (at least 2 characters).")
    .max(120, "Name must be 120 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  countryCode: z.string().trim().min(2, "Please select a country code."),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9\s\-().]{7,20}$/, "Please enter a valid phone number."),
  streetAddress: z
    .string()
    .trim()
    .min(3, "Please enter your street address.")
    .max(200, "Street address is too long."),
  city: z
    .string()
    .trim()
    .min(2, "Please enter your city.")
    .max(100, "City is too long."),
  state: z
    .string()
    .trim()
    .min(2, "Please enter your state or region.")
    .max(100, "State/region is too long."),
  postalCode: z
    .string()
    .trim()
    .min(3, "Please enter your postal or ZIP code.")
    .max(20, "Postal code is too long."),
  doctor: z.string().trim().min(1, "Please select a doctor."),
  message: z
    .string()
    .trim()
    .max(2000, "Message must be 2000 characters or fewer.")
    .optional()
    .default(""),
  // Honeypot field — must remain empty for legitimate users
  website: z.string().max(200).optional().default(""),
});

export type ConsultPayload = z.infer<typeof consultSchema>;
