import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getCookie, setCookie } from "hono/cookie";

export const config = {
  runtime: "edge"
};

const env = {
  githubClientId: process.env.GITHUB_CLIENT_ID!,
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET!,
  githubRedirectUri: process.env.GITHUB_REDIRECT_URI!,
  appOrigin:
    process.env.NODE_ENV === "production"
      ? "https://oortsky.vercel.app"
      : "http://localhost:5173"
};

const app = new Hono()

function popupResponse(payload: Record<string, unknown>, targetOrigin: string) {
  const message = JSON.stringify(payload);
  const origin = JSON.stringify(targetOrigin);

  return `
    <html>
      <body>
        <script>
          window.opener?.postMessage(${message}, ${origin});
          window.close();
        </script>
      </body>
    </html>
  `;
}

app.get("/api/auth", c => {
  const state = crypto.randomUUID();

  setCookie(c, "oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 600,
    path: "/"
  });

  const authURL = new URL("https://github.com/login/oauth/authorize");

  authURL.searchParams.set("client_id", env.githubClientId);
  authURL.searchParams.set("redirect_uri", env.githubRedirectUri);
  authURL.searchParams.set("scope", "repo user");
  authURL.searchParams.set("state", state);

  return c.redirect(authURL.toString());
});

app.get("/api/auth/callback", async c => {
  return c.text("Callback...");
});

export default handle(app);
