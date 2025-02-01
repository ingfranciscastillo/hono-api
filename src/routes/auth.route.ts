import { Hono } from "hono";
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'

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

export const authRouter = new Hono();

// /api/v1/auth/register
authRouter.post("/register", zValidator("json", registerSchema), async (c) => {

    const { email, password, username } = await c.req.json();

    return c.json({
        email, password, username
    });
})

// /api/v1/auth/login
authRouter.post("/login", zValidator("json", loginSchema), async (c) => {
    const { email, password } = await c.req.json();

    return c.json({ email, password });
})

export default authRouter;