/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.communitydragon.org",
        pathname:
          "/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/*.png",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/apexlegends_gamepedia_en/images/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/120x134/png",
      },
    ],
  },
};

export default config;
