// contentlayer.config.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "date", required: true },
    category: { type: "string", required: true },
    slug: { type: "string", required: true },
    ogImage: { type: "string", required: false },
    readTime: { type: "string", required: false },
    author: {
      type: "nested",
      of: defineNestedType(() => ({
        name: "Author",
        fields: {
          name: { type: "string", required: true },
          avatar: { type: "string", required: false },
          bio: { type: "string", required: false },
          twitter: { type: "string", required: false },
          linkedin: { type: "string", required: false },
        },
      })),
      required: false,
    },
  },
  computedFields: {
    url: { type: "string", resolve: (post) => `/blog/${post.slug}` },
  },
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
});
export { Blog, contentlayer_config_default as default };
//# sourceMappingURL=compiled-contentlayer-config-MRUXLRXS.mjs.map
