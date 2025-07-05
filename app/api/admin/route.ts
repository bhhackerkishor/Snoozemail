import Blog from "@/lib/model/blog";
import connectToDB from "@/lib/db";

export async function POST(request: Request) {
  await connectToDB();

  try {
    const body = await request.json();
    const blog = await Blog.create(body);
    return new Response(JSON.stringify(blog), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to create blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  await connectToDB();

  const blogs = await Blog.find({});
  return new Response(JSON.stringify(blogs), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
