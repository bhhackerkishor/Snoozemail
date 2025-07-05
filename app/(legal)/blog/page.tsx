import connectToDB from "@/lib/db";
import Blog from "@/lib/model/blog";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SnoozeMail Blog | Email Productivity Tips & News",
  description:
    "Discover the latest tips, tricks, and news about SnoozeMail to revolutionize your email workflow and boost productivity.",
  openGraph: {
    title: "SnoozeMail Blog | Email Productivity Tips & News",
    description:
      "Discover the latest tips, tricks, and news about SnoozeMail to revolutionize your email workflow.",
    url: "https://snoozemail.com/blog",
    type: "website",
  },
};

export default async function BlogListPage() {
  await connectToDB();
  const blogs = await Blog.find({}).sort({ date: -1 }).lean();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-800 dark:text-blue-400 mb-4">
            The SnoozeMail Blog
          </h1>
          <p className="text-xl text-blue-600 dark:text-blue-300 max-w-3xl mx-auto">
            Discover productivity tips, email strategies, and SnoozeMail updates
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition">
              <span>Subscribe to updates</span>
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Featured Post */}
        {blogs.length > 0 && (
          <Link
            href={`/blog/${blogs[0].slug}`}
            className="group block mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className="md:flex">
              <Image
                src={blogs[0].ogImage}
                alt={blogs[0].imageAlt || blogs[0].title}
                className="md:w-1/2 h-64 md:h-auto object-cover"
              />
              <div className="p-6 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center mb-2 text-sm text-blue-700 dark:text-blue-300 gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 rounded-full font-semibold">
                    {blogs[0].category}
                  </span>
                  <span>{new Date(blogs[0].date).toLocaleDateString()}</span>
                  {blogs[0].readTime && <span>• {blogs[0].readTime}</span>}
                </div>
                <h2 className="text-3xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {blogs[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {blogs[0].description}
                </p>
                <div className="flex items-center">
                  <Image
                    src={blogs[0].author.avatar}
                    alt={blogs[0].author.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="text-sm font-medium">
                      {blogs[0].author.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {blogs[0].author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.slice(1).map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={String(post._id)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <Image
                  src={post.ogImage}
                  alt={post.imageAlt || post.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">
                    {post.category} • {new Date(post.date).toLocaleDateString()}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center mt-4">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <p className="text-sm">{post.author.name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* Newsletter CTA */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 md:p-12 text-center text-gray-900 dark:text-white mt-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-600 dark:text-sky-100 max-w-2xl mx-auto mb-6">
            Get the latest productivity tips and SnoozeMail updates delivered
            straight to your inbox
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-lg text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
            />
            <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-r-lg font-medium transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
