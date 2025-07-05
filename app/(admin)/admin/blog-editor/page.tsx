"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function BlogEditorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    slug: "",
    date: "",
    category: "",
    readTime: "",
    ogImage: "",
    imageAlt: "",
    content: "",
    author: {
      name: "",
      avatar: "",
      bio: "",
      twitter: "",
      linkedin: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Handle nested author fields
    if (name.startsWith("author.")) {
      const authorField = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post("/api/blog", form);

      toast.success("✅ Blog saved to database!");
    } catch (error) {
      toast.error("❌ Failed to save blog. Check console.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Post
        </h1>
        <p className="text-gray-500">
          Craft your perfect blog post for Snoozemail
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Post Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title*
            </label>
            <input
              id="title"
              name="title"
              placeholder="Getting Started with SnoozeMail"
              value={form.title}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="slug"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Slug*
            </label>
            <input
              id="slug"
              name="slug"
              placeholder="first-post"
              value={form.slug}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description*
            </label>
            <input
              id="description"
              name="description"
              placeholder="Learn how to use SnoozeMail to revolutionize your email workflow"
              value={form.description}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category*
            </label>
            <input
              id="category"
              name="category"
              placeholder="Tutorial"
              value={form.category}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Publish Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={form.date}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="readTime"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Read Time*
            </label>
            <input
              id="readTime"
              name="readTime"
              placeholder="5 min read"
              value={form.readTime}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="ogImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              OG Image URL
            </label>
            <input
              id="ogImage"
              name="ogImage"
              placeholder="/images/blog/first-post.jpg"
              value={form.ogImage}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="imageAlt"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Image Alt Text
            </label>
            <input
              id="imageAlt"
              name="imageAlt"
              placeholder="Person using SnoozeMail on laptop"
              value={form.imageAlt}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Author Information */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Author Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="author.name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name*
              </label>
              <input
                id="author.name"
                name="author.name"
                placeholder="Kishor Kumar"
                value={form.author.name}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="author.avatar"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Avatar URL*
              </label>
              <input
                id="author.avatar"
                name="author.avatar"
                placeholder="/images/authors/kishor.avif"
                value={form.author.avatar}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="author.bio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Bio*
              </label>
              <input
                id="author.bio"
                name="author.bio"
                placeholder="Founder of SnoozeMail"
                value={form.author.bio}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="author.twitter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Twitter URL
              </label>
              <input
                id="author.twitter"
                name="author.twitter"
                placeholder="https://twitter.com/kishor_dev"
                value={form.author.twitter}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="author.linkedin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LinkedIn URL
              </label>
              <input
                id="author.linkedin"
                name="author.linkedin"
                placeholder="https://linkedin.com/in/kishorkumarv"
                value={form.author.linkedin}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content*
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your content here (markdown or MDX supported)"
            value={form.content}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[300px]"
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
