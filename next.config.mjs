/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "*.amazonaws.com",
        }, {
            protocol: "https",
            hostname: "*.ssl-images-amazon.com",
        }],
    },
};

export default nextConfig;
