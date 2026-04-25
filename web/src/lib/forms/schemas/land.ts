import { z } from "zod";

export const landStep1Schema = z.object({
  county: z.string().min(1, "County is required"),
  state: z.string().min(2, "State is required"),
  apn: z.string().optional(),
  acreage: z.number({ error: "Enter a number" }).positive("Must be positive"),
  ownershipType: z.enum(["sole", "partnership", "trust", "llc", "other"]).optional(),
  hasTalkedToBrokers: z.boolean().optional(),
});

export const landStep2Schema = z.object({
  substationDistanceMiles: z.number({ error: "Enter a number" }).nonnegative().optional(),
  transmissionVoltage: z.enum(["<115kV", "115-230kV", "230-500kV", "500+kV", "unknown"]).optional(),
  fiberDistanceMiles: z.number({ error: "Enter a number" }).nonnegative().optional(),
  waterAccess: z.enum(["yes", "no", "unknown"]).optional(),
  zoning: z.enum(["agricultural", "industrial", "mixed", "unknown"]).optional(),
});

export const landStep3Schema = z.object({
  timeline: z.enum(["now", "6months", "12months", "exploring"]).optional(),
  priceExpectation: z.string().optional(),
  preferredStructure: z.enum(["sell", "ground-lease", "jv", "open"]).optional(),
});

export const landStep4Schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  role: z.enum(["owner", "agent", "family-rep", "other"]).optional(),
  referralSource: z.string().optional(),
});

export const landFullSchema = landStep1Schema
  .merge(landStep2Schema)
  .merge(landStep3Schema)
  .merge(landStep4Schema);

export type LandFormData = z.infer<typeof landFullSchema>;
