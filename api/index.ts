import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";

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

function popupResponse(message: string) {
  const payload = JSON.stringify(message);

  return `
    <html>
      <body>
        <script>
          (function() {
            function receiveMessage(e) {
              window.opener.postMessage(${payload}, e.origin);
              window.removeEventListener("message", receiveMessage, false);
              setTimeout(function() { window.close(); }, 300);
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
    </html>
  `;
}

app.get("/auth/github", c => {
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

app.get("/auth/github/callback", async c => {
  const code = c.req.query("code");
  const state = c.req.query("state");
  const savedState = getCookie(c, "oauth_state");

  if (!code || !state || state !== savedState) {
    return c.html(
      popupResponse("authorization:github:error:Invalid state or missing code")
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

    const content = JSON.stringify({
      token: tokenData.access_token,
      provider: "github"
    });

    return c.html(popupResponse(`authorization:github:success:${content}`));
  } catch (err) {
    console.error("OAuth callback error:", err);

    return c.html(popupResponse("authorization:github:error:OAuth failed"));
  }
});

export default app;
