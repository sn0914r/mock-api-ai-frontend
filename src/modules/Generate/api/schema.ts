import { z } from "zod";

export const generateApiSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  limit: z.number().min(1, "Limit must be at least 1").max(50, "Limit cannot exceed 50"),
});

export type GenerateApiFormValues = z.infer<typeof generateApiSchema>;
