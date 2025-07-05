// contentlayer.config.js
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "string", required: true },
    slug: { type: "string", required: true },
    ogImage: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/blog/${post.slug}`,
    },
  },
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
    // 🔧 temporarily remove rehypePrettyCode for now
  },
});
export { Blog, contentlayer_config_default as default };
//# sourceMappingURL=compiled-contentlayer-config-62UGUUMX.mjs.map
