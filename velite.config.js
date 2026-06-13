import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.md",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.slug("posts"),

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
          slug: s.slug("projects"),

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
