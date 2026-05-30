import type { NextConfig } from "next";

const repoName = "simple-online-tools";
const useGithubPagesPath = process.env.GITHUB_ACTIONS === "true" || process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: useGithubPagesPath ? `/${repoName}` : "",
  assetPrefix: useGithubPagesPath ? `/${repoName}/` : undefined,
  typedRoutes: true,
};

export default nextConfig;
