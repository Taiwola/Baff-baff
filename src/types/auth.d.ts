import z from "zod";
import { authUserSchema } from "@utils/validation/auth";

type AuthUser = z.infer<typeof authUserSchema>