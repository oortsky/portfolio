import { Hono } from "hono";
import { handle } from "hono/vercel";
import { env } from "../src/lib/env";

const app = new Hono();

app
.basePath("/api")
  .get("/auth", c => {
    const authURL = new URL("https://github.com/login/oauth/authorize");

    authURL.searchParams.set("client_id", env.githubClientId);

    authURL.searchParams.set("redirect_uri", env.githubRedirectUri);

    authURL.searchParams.set("scope", "repo user");

    return c.redirect(authURL.toString());
  })
  .get("/auth/callback", async c => {
    const code = c.req.query("code");

    if (!code) {
      return c.html(`
      <script>
        window.opener?.postMessage(
          { error: "Missing code" },
          "*"
        );

        window.close();
      </script>
    `);
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

      const tokenData = await tokenResponse.json();

      const accessToken = tokenData.access_token;

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const payload = JSON.stringify({
        token: accessToken,
        provider: "github"
      });

      const message = JSON.stringify(`authorization:github:success:${payload}`);

      return c.html(`
      <html>
        <body>
          <script>
            (function () {
              function receiveMessage(event) {
                window.opener?.postMessage(
                  ${message},
                  event.origin
                );

                setTimeout(() => {
                  window.close();
                }, 300);
              }

              window.addEventListener(
                "message",
                receiveMessage,
                false
              );

              window.opener?.postMessage(
                "authorizing:github",
                "*"
              );
            })();
          </script>
        </body>
      </html>
    `);
    } catch {
      const message = JSON.stringify("authorization:github:error:OAuth failed");

      return c.html(`
      <html>
        <body>
          <script>
            (function () {
              function receiveMessage(event) {
                window.opener?.postMessage(
                  ${message},
                  event.origin
                );

                setTimeout(() => {
                  window.close();
                }, 300);
              }

              window.addEventListener(
                "message",
                receiveMessage,
                false
              );

              window.opener?.postMessage(
                "authorizing:github",
                "*"
              );
            })();
          </script>
        </body>
      </html>
    `);
    }
  });

export const GET = handle(app);
export const POST = handle(app);
