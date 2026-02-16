export interface PostEntry {
  title: string;
  description: string;
  coverImage: string | null;
  publishedDate: string;
  tags: string[];
  content: string;
}

export interface Post {
  slug: string;
  entry: PostEntry;
}

export interface ProjectEntry {
  title: string;
  description: string;
  thumbnail: string | null;
  projectUrl: string;
  githubUrl: string;
  technologies: string[];
  content: string;
}

export interface Project {
  slug: string;
  entry: ProjectEntry;
}