import { z } from "zod";

export const capacitySchema = z.object({
  company: z.string().min(1, "Company is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  mwRequired: z.number({ invalid_type_error: "Enter a number" }).positive().optional(),
  targetOnlineDate: z.string().optional(),
  marketPreferences: z.array(z.string()).optional(),
  workloadType: z.enum(["training", "inference", "general-compute", "colocation"]).optional(),
  connectivityNeeds: z.string().optional(),
});

export type CapacityFormData = z.infer<typeof capacitySchema>;
