const BADGES = [
  "HTML5-E34F26?logo=html5&logoColor=white",
  "CSS3-1572B6?logo=css3&logoColor=white",
  "JavaScript-F7DF1E?logo=javascript&logoColor=black",
  "TypeScript-3178C6?logo=typescript&logoColor=white",
  "React-61DAFB?logo=react&logoColor=black",
  "Next.js-000000?logo=next.js&logoColor=white",
  "Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white",
  "ShadCN/UI-000000?logo=shadcnui&logoColor=white",
  "Node.js-339933?logo=node.js&logoColor=white",
  "Supabase-3ECF8E?logo=supabase&logoColor=white",
  "PostgreSQL-4169E1?logo=postgresql&logoColor=white",
  "Firebase-FFCA28?logo=firebase&logoColor=black",
  "Git-F05032?logo=git&logoColor=white",
  "GitHub-181717?logo=github&logoColor=white",
  "langchain-1C3C3C?logo=langchain&logoColor=white",
  "google_gemini-8E75B2?logo=googlegemini&logoColor=white",
  "chatgpt-74aa9c?logo=openai&logoColor=white",
  "github_copilot-000000?logo=githubcopilot&logoColor=white"
];

export function TechBadges() {
  return (
    <div className="max-w-lg mx-auto">
      <div className="flex flex-wrap gap-2">
        {BADGES.map((badge, i) => (
          <img
            key={i}
            className="h-7"
            src={`https://img.shields.io/badge/${badge}&style=for-the-badge`}
            alt="Tech Badge"
          />
        ))}
      </div>
    </div>
  );
}
