import { jwt } from 'hono/jwt';
import { Hono } from "hono";
import {authRouter} from "./routes/auth.route";

const app = new Hono();

if(!process.env.JWT_SECRET) {
    throw new Error("Please provide a JWT_SECRET in the environment variables");
}

const authMiddleware = jwt({
    secret: process.env.JWT_SECRET!, // the secret key used to sign the JWT
})

app.get("/hello", (c) => {
    return c.json({
        message: "Hello World!"
    });
})

app.route("/api/v1/auth", authRouter);
app.use("/api/v1/protected/*", authMiddleware);

app.get("/api/v1/protected/hello", (c) => {
    return c.json({
        message: "Hello World! This is a protected route"
    });
});

app.get("/api/v1/protected/profile", (c) => {
    const user = c.get("jwtPayload");
    return c.json({
        message: `This is your protected profile`,
        user: {
            id: user.id,
            email: user.email,
        }
    });
}); 

export default {
    port: 4000,
    fetch: app.fetch,
}