import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Заголовок должен содержать более 3 символов" })
    .max(128, { message: "Заголовок должен содержать не более 128 символов" }),
  subredditId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
