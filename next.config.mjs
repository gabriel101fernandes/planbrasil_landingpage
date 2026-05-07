/** Subpasta no hospedeiro (ex.: `/meu-repo` no GitHub Pages). Na raiz do domínio, não defina BASE_PATH. */
function normalizeBasePath(raw) {
  const v = (raw ?? "").trim();
  if (!v || v === "/") return "";
  const withSlash = v.startsWith("/") ? v : `/${v}`;
  return withSlash.replace(/\/$/, "") || "";
}

const basePath = normalizeBasePath(process.env.BASE_PATH);

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ["next/image"]
  }
};

export default nextConfig;
