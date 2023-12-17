// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"
import type { Role } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: {
            role: Role,
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: Role,
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        role: string,
    }
}