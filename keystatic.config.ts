import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local"
  },
  ui: {
    brand: {
      name: "OORTSKY - Dashboard CMS"
    }
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { max: 200 } }
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/assets/images/posts",
          publicPath: "/assets/images/posts/"
        }),
        publishedDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" }
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: props => props.value
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/assets/images/posts/content",
              publicPath: "/assets/images/posts/content/"
            }
          }
        })
      }
    }),

    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Description",
          multiline: true,
          validation: { length: { max: 150 } }
        }),
        thumbnail: fields.image({
          label: "Thumbnail",
          directory: "public/assets/images/projects",
          publicPath: "/assets/images/projects/"
        }),
        projectUrl: fields.url({
          label: "Project URL",
          validation: { isRequired: false }
        }),
        githubUrl: fields.url({
          label: "GitHub URL",
          validation: { isRequired: false }
        }),
        technologies: fields.array(fields.text({ label: "Technology" }), {
          label: "Technologies",
          itemLabel: props => props.value
        }),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/assets/images/projects/content",
              publicPath: "/assets/images/projects/content/"
            }
          }
        })
      }
    }),
  }
});
