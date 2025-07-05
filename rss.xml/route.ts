import { allBlogs } from ".contentlayer/generated";
import { NextResponse } from "next/server";

export async function GET() {
  const siteUrl = "https://snoozemail.in";

  const items = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(
      (post) => `
      <item>
        <title>${post.title}</title>
        <link>${siteUrl}${post.url}</link>
        <guid>${siteUrl}${post.url}</guid>
        <description>${post.description}</description>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      </item>
    `,
    )
    .join("");

  const rss = `
    <rss version="2.0">
      <channel>
        <title>SnoozeMail Blog</title>
        <link>${siteUrl}</link>
        <description>Email mastery with reminders — the SnoozeMail way.</description>
        ${items}
      </channel>
    </rss>
  `.trim();

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
