// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "fs";
import path from "path";

export default defineConfig({
  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
    envPrefix: ["VITE_", "SUPABASE_"],
    plugins: [
      {
        name: "api-nexy-middleware",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url && req.url.startsWith("/api/nexy")) {
              // Read body on POST requests
              let bodyData = "";
              req.on("data", (chunk) => {
                bodyData += chunk;
              });
              req.on("end", async () => {
                try {
                  let body = {};
                  if (bodyData) {
                    try {
                      body = JSON.parse(bodyData);
                    } catch (e) {}
                  }

                  // Load handler logic dynamically based on URL path
                  const isHelper = req.url && req.url.startsWith("/api/nexy/helper");
                  const modulePath = isHelper ? "/api/helper.ts" : "/api/nexy.ts";
                  const { default: handler } = await server.ssrLoadModule(modulePath);

                  // Mock VercelRequest and VercelResponse
                  const vercelReq = Object.assign(req, {
                    body,
                    query: Object.fromEntries(new URL(req.url || "", `http://${req.headers.host}`).searchParams),
                  }) as any;

                  const vercelRes = {
                    status(code: number) {
                      res.statusCode = code;
                      return vercelRes;
                    },
                    setHeader(name: string, value: string) {
                      res.setHeader(name, value);
                      return vercelRes;
                    },
                    send(text: string) {
                      res.end(text);
                      return vercelRes;
                    },
                    json(data: any) {
                      res.setHeader("Content-Type", "application/json");
                      res.end(JSON.stringify(data));
                      return vercelRes;
                    },
                    end() {
                      res.end();
                      return vercelRes;
                    }
                  } as any;

                  await handler(vercelReq, vercelRes);
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end("Nexy error: Local API error: " + err.message);
                }
              });
              return;
            }
            next();
          });
        }
      }
    ],
    server: {
      proxy: {
        "/rest/v1": {
          target: "https://eiecuiberhqmyvvlrakn.supabase.co",
          changeOrigin: true,
        },
        "/auth/v1": {
          target: "https://eiecuiberhqmyvvlrakn.supabase.co",
          changeOrigin: true,
        },
      },
    },
  },
  nitro: {
    preset: "vercel",
  },
});
