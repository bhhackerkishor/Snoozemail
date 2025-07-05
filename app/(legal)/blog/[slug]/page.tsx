import connectToDB from "@/lib/db";
import Blog from "@/lib/model/blog";
//import { MDXRemote } from 'next-mdx-remote';
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPageProps {
  params: { slug: string };
}
export type BlogType = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
  readTime?: string;
  ogImage?: string;
  imageAlt?: string;
  author?: {
    name: string;
    avatar?: string;
    bio?: string;
  };
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  await connectToDB();
  const { slug } = params;
  const post = (await Blog.findOne({ slug }).lean()) as BlogType | null;

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      images: [post.ogImage || "/default-og.png"],
    },
  };
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = params; // ✅ avoid sync‑dynamic param warning

  await connectToDB();
  const blog = (await Blog.findOne({ slug }).lean()) as BlogType | null;
  if (!blog) notFound();

  return (
    <article className="max-w-3xl mx-auto p-4">
      {/* Cover Image */}
      <Image
        src={blog.ogImage || "/default-og.png"}
        alt={blog.imageAlt || blog.title}
        className="w-full rounded-lg mb-6"
      />

      {/* Title & Meta */}
      <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-4 flex flex-wrap gap-4">
        <span>{new Date(blog.date).toLocaleDateString()}</span>
        <span>•</span>
        <span>{blog.category}</span>
        {blog.readTime && (
          <>
            <span>•</span>
            <span>{blog.readTime}</span>
          </>
        )}
      </div>

      {/* Author */}
      {blog.author && (
        <div className="flex items-center gap-3 mb-8">
          {blog.author.avatar && (
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <p className="text-sm font-semibold">{blog.author.name}</p>
            {blog.author.bio && (
              <p className="text-xs text-gray-500">{blog.author.bio}</p>
            )}
          </div>
        </div>
      )}

      {/* MDX Content */}
      <div className="mdx-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </article>
  );
}
