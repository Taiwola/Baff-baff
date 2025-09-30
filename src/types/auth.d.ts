import z from "zod";
import { authUserSchema } from "@validations/auth";

type AuthUser = z.infer<typeof authUserSchema>