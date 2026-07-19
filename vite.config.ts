// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const nexyApiPlugin = () => ({
  name: "nexy-api-plugin",
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === "/api/nexy" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk;
        });
        req.on("end", async () => {
          try {
            const { prompt, model } = JSON.parse(body || "{}");
            if (!prompt) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ error: "Prompt is required." }));
              return;
            }

            // Off-topic filter matching api/nexy.ts exactly
            const lowerPrompt = prompt.toLowerCase();
            const offTopicTriggers = [
              "kod yaz", "bana kod", "write code", "javascript", "python", "html", "css",
              "react", "programming", "bana yazılım", "programlama", "sql", "database",
              "docker", "typescript", "kodlama", "yazılım geliştir", "kodunu", "hacker", "hackle"
            ];
            const hasOffTopic = offTopicTriggers.some(trigger => lowerPrompt.includes(trigger));
            const isCompanyRelated = lowerPrompt.includes("fun teknoloji") ||
                                     lowerPrompt.includes("fun technology") ||
                                     lowerPrompt.includes("nexy") ||
                                     lowerPrompt.includes("quakesafe");

            if (hasOffTopic && !isCompanyRelated) {
              res.statusCode = 400;
              res.setHeader("Content-Type", "text/plain; charset=utf-8");
              res.end("Nexy, Fun Teknoloji şirketinin resmi asistanıdır. İstek dışı kod yazma, programlama veya genel geliştirme talepleri engellenmiştir. Lütfen yalnızca Fun Teknoloji projeleri ve hizmetleri hakkında sorular sorun.");
              return;
            }

            const targetUrl = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=${model || "openai"}&cache=false`;
            const response = await fetch(targetUrl);
            if (!response.ok) {
              throw new Error(`Pollinations error: ${response.statusText}`);
            }
            const text = await response.text();
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain; charset=utf-8");
            res.end(text);
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

export default defineConfig({
  vite: {
    plugins: [nexyApiPlugin()],
    build: {
      chunkSizeWarningLimit: 1500,
    },
    envPrefix: ["VITE_", "SUPABASE_"],
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
