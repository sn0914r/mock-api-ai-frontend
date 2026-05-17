import { z as zod } from "zod";

export const generateApiSchema = zod.object({
  prompt: zod.string().min(1, "Prompt is required"),
  limit: zod
    .number()
    .min(1, "Limit must be at least 1")
    .max(50, "Limit cannot exceed 50"),
});

export type GenerateApiFormValues = zod.infer<typeof generateApiSchema>;
