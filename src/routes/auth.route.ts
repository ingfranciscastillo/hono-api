import { Hono } from "hono";

export const authRouter = new Hono();

// /api/v1/auth/login
authRouter.post("/login", (c) => {
    return c.json({
        message: "Login"
    });
})

// /api/v1/auth/register
authRouter.post("/register", (c) => {
    return c.json({
        message: "Register"
    });
})

export default authRouter;