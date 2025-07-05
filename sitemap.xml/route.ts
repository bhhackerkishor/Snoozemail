import { allBlogs } from "contentlayer/generated";
import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = "https://snoozemail.in";

  const urls = allBlogs.map(
    (post) => `
      <url>
        <loc>${siteUrl}${post.url}</loc>
        <lastmod>${post.date}</lastmod>
      </url>`,
  );

  const staticUrls = ["", "/blog", "/signup", "/login", "/dashboard"].map(
    (path) => `
      <url>
        <loc>${siteUrl}${path}</loc>
      </url>`,
  );

  const sitemap = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticUrls, ...urls].join("")}
    </urlset>
  `.trim();

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
