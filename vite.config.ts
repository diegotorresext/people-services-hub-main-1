import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  // load env variables for the current mode (development / production)
  // you can set VITE_BASE in your workflow or environment to override the default
  const env = loadEnv(mode, process.cwd(), "");
  const envBase = env.VITE_BASE || "";

  // default repo base for production (set to your repo name)
  const defaultRepoBase = "/people-services-hub-main-1/";

  // use root (/) during development so local dev server works normally
  const base = mode === "development" ? "/" : (envBase || defaultRepoBase);

  return defineConfig({
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
};
