import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  slug: { type: String, unique: true },
  content: String, // store raw MDX or markdown
  date: Date,
  category: String,
  ogImage: String,
  readTime: String,
  author: {
    name: String,
    avatar: String,
    bio: String,
    twitter: String,
    linkedin: String,
  },
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
