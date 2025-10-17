import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*.supabase.co",
            },
        ],
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: `
              default-src 'self';
              script-src 'self' https://challenges.cloudflare.com;
              frame-src https://challenges.cloudflare.com;
              img-src 'self' https://challenges.cloudflare.com data:;
              style-src 'self' 'unsafe-inline';
            `
                            .replace(/\s{2,}/g, " ")
                            .trim(),
                    },
                ],
            },
        ];
    },
};

export default withSentryConfig(nextConfig, {
    org: "tyler-latshaw",
    project: "personal-website",

    silent: !process.env.CI,
    widenClientFileUpload: true,
    tunnelRoute: "/monitoring",
    disableLogger: true,
    automaticVercelMonitors: true,
});