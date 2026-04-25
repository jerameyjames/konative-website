import { z } from "zod";

export const investorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  firm: z.string().optional(),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  aumBand: z.enum(["<$100M", "$100M-$500M", "$500M-$2B", "$2B-$10B", "$10B+"]).optional(),
  checkSize: z.enum(["<$10M", "$10M-$50M", "$50M-$200M", "$200M-$1B", "$1B+"]).optional(),
  assetPreferences: z.array(z.enum(["powered-land", "stabilized-colo", "development-jv", "platform"])).optional(),
  geographyPreferences: z.string().optional(),
});

export type InvestorFormData = z.infer<typeof investorSchema>;
