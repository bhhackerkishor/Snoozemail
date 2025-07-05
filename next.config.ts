// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"], // 👈 Add this
  },
};

module.exports = nextConfig;
