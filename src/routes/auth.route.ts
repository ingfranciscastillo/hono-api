import { Hono } from "hono";
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import {sign} from "hono/jwt"

import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const registerSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: "Invalid email address"
    }),
    password: z.string().min(8, { message: "Invalid password"}),
    username: z.string().min(3, { message: "Invalid username"}),
});

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email({
        message: "Invalid email address"
    }),
    password: z.string().trim().toLowerCase().min(8, { message: "Invalid password"}),
});

if(!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

export const authRouter = new Hono();

// /api/v1/auth/register
authRouter.post("/register", zValidator("json", registerSchema), async (c) => {

    const { email, password, username } = await c.req.json();

    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (user.length > 0) {
        return c.json({
            error: "User already exists"
        }, 400);
    }

    const bscryptHash = await Bun.password.hash(password, {
        algorithm: "argon2id",
        memoryCost: 4,
        timeCost: 3,
    })

    const [newUser] = await db.insert(usersTable).values({
        email,
        password: bscryptHash,
        username,
    }).returning({
        id: usersTable.id,
        email: usersTable.email,
        username: usersTable.username,
    })

    return c.json({
        message: "Usuario registrado exitosamente",
        user: newUser
    });
})

// /api/v1/auth/login
authRouter.post("/login", zValidator("json", loginSchema), async (c) => {

    const { email, password } = await c.req.json();

    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if (!user) {
        return c.json({
            error: "User not found"
        }, 404);
    }

    const passwordMatch = await Bun.password.verify(password, user.password, "argon2id");

    if (!passwordMatch) {
        return c.json({
            error: "Invalid password"
        }, 401);
    }

    const payload = {
        id: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 5 // 5 minutes
    };
    const secret = process.env.JWT_SECRET as string;

    const token = await sign(
        payload,
        secret,
    );

    return c.json({ token });
})

export default authRouter;