import { Hono } from "hono";
import {authRouter} from "./routes/auth.route";

const app = new Hono();

app.get("/hello", (c) => {
    return c.json({
        message: "Hello World!"
    });
})

app.route("/api/v1/auth", authRouter);

export default {
    port: 4000,
    fetch: app.fetch,
}