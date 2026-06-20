// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    envPrefix: ["VITE_", "SUPABASE_"],
    server: {
      proxy: {
        '/rest/v1': {
          target: 'https://eiecuiberhqmyvvlrakn.supabase.co',
          changeOrigin: true,
        },
        '/auth/v1': {
          target: 'https://eiecuiberhqmyvvlrakn.supabase.co',
          changeOrigin: true,
        },
        '/api/nexy': {
          target: 'https://text.pollinations.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nexy/, '')
        }
      }
    }
  },
  nitro: {
    preset: "vercel",
  },
});
