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

const app = new Hono().basePath("/api");

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

app.get("/auth", c => {
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

app.get("/auth/callback", async c => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  const savedState = getCookie(c, "oauth_state");

  if (!code || !state || state !== savedState) {
    return c.html(
      popupResponse(
        {
          type: "oauth-error",
          provider: "github",
          error: "Invalid state or missing code"
        },
        env.appOrigin
      )
    );
  }

  try {
    const tokenResponse = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          client_id: env.githubClientId,
          client_secret: env.githubClientSecret,
          code,
          redirect_uri: env.githubRedirectUri
        })
      }
    );

    const tokenData = (await tokenResponse.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (!tokenData.access_token) {
      console.error(
        "GitHub token exchange failed:",
        tokenData.error,
        tokenData.error_description
      );
      throw new Error("Access token not found");
    }

    return c.html(
      popupResponse(
        {
          type: "oauth-success",
          provider: "github",
          token: tokenData.access_token
        },
        env.appOrigin
      )
    );
  } catch (err) {
    console.error("OAuth callback error:", err);

    return c.html(
      popupResponse(
        { type: "oauth-error", provider: "github", error: "OAuth failed" },
        env.appOrigin
      )
    );
  }
});

export default handle(app);
