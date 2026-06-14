import { Hono } from "hono";
import { handle } from "hono/vercel";
import { setCookie } from "hono/cookie";

export const config = {
  runtime: "edge",
};

const env = {
  githubClientId: process.env.GITHUB_CLIENT_ID!,
  githubRedirectUri: process.env.GITHUB_REDIRECT_URI!,
};

const app = new Hono();

app.get("/api/auth", c => {
  const state = crypto.randomUUID();

  setCookie(c, "oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 600,
    path: "/",
  });

  const authURL = new URL("https://github.com/login/oauth/authorize");
  authURL.searchParams.set("client_id", env.githubClientId);
  authURL.searchParams.set("redirect_uri", env.githubRedirectUri);
  authURL.searchParams.set("scope", "repo user");
  authURL.searchParams.set("state", state);

  return c.redirect(authURL.toString());
});

export default handle(app);