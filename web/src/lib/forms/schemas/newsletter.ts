import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email("Valid email required"),
  name: z.string().optional(),
  source: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
