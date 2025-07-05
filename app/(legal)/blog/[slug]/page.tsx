// app/(legal)/blog/[slug]/page.tsx
import connectToDB from '@/lib/db';
import Blog from '@/lib/model/blog';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';



type Blog = {
  _id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  content: string;
  readTime?: string;
  ogImage?: string;
  imageAlt?: string;
  author?: { name: string; avatar?: string; bio?: string };
};

/** 2. Let Next infer the full props type — do NOT annotate it manually */
export async function generateMetadata(
  { params }: { params: PageParams }
){
  await connectToDB();
  const post = (await Blog.findOne({ slug: params.slug }).lean()) as Blog | null;
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { images: [post.ogImage || '/default-og.png'] },
  };
}

/** 3. Do the same here */
export default async function Page(
  { params }: { params: PageParams }
) {
  await connectToDB();
  const blog = (await Blog.findOne({ slug: params.slug }).lean()) as Blog | null;
  if (!blog) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-4">
      <Image
        src={blog.ogImage || '/default-og.png'}
        alt={blog.imageAlt || blog.title}
        width={1200}
        height={600}
        className="w-full rounded-lg mb-6"
      />
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

      {blog.author && (
        <div className="flex items-center gap-3 mb-8">
          {blog.author.avatar && (
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              width={40}
              height={40}
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

      <ReactMarkdown>{blog.content}</ReactMarkdown>
    </article>
  );
}
