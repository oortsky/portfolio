import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/", c => {
  return c.json({
    success: true,
    message: "API Running"
  });
});

app.get("/auth", c => {
  return c.text("Auth");
});

app.get("/auth/callback", c => {
  return c.text("Callback");
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
