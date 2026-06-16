import { defineConfig, s } from "velite";

export default defineConfig({
  root: "src/content",
  output: {
    data: ".velite",
    assets: "src/assets/uploads",
    base: "/src/assets/uploads/",
    name: "[name]-[hash:8].[ext]",
    clean: true
  },
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path(),

          description: s.string().max(160),

          date: s.isodate(),

          category: s.string(),

          tags: s.array(s.string()).default([]),

          featured: s.boolean().default(false),

          cover: s.image().optional(),

          metadata: s.metadata(),
          excerpt: s.excerpt(),

          content: s.markdown()
        })
        .transform(data => ({
          ...data,
          permalink: `/blog/${data.slug}`
        }))
    },

    projects: {
      name: "Project",
      pattern: "projects/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path(),

          description: s.string().max(160),

          category: s.string(),

          technologies: s.array(s.string()).default([]),

          status: s
            .enum(["Planning", "In Progress", "Completed", "Archived"])
            .default("In Progress"),

          featured: s.boolean().default(false),

          repository: s.string().optional(),
          website: s.string().optional(),

          cover: s.image().optional(),

          content: s.markdown()
        })
        .transform(data => ({
          ...data,
          permalink: `/projects/${data.slug}`
        }))
    }
  }
});
