import * as z from "zod";

export const LoginInput = z.object({
  login: z.string(),
  password: z.string(),
});
export type LoginInputType = z.infer<typeof LoginInput>;
