import { useMemo, useState } from "react";

export type SortOption = "newest" | "oldest" | "a-z" | "z-a";

export type FilterableContent = {
  title: string;
  description?: string;
  category?: string;
  tags?: string[];
  date?: string;
};

export function useContentFilter<T extends FilterableContent>(items: T[]) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState<SortOption>("newest");

  const filteredItems = useMemo(() => {
    let result = [...items];

    const keyword = search.trim().toLowerCase();

    if (keyword) {
      result = result.filter(item =>
        [item.title, item.description, item.category, ...(item.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(keyword)
      );
    }

    if (category !== "All") {
      result = result.filter(item => item.category === category);
    }

    result.sort((a, b) => {
      switch (sort) {
        case "newest":
          return (
            new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
          );

        case "oldest":
          return (
            new Date(a.date ?? 0).getTime() - new Date(b.date ?? 0).getTime()
          );

        case "a-z":
          return a.title.localeCompare(b.title);

        case "z-a":
          return b.title.localeCompare(a.title);

        default:
          return 0;
      }
    });

    return result;
  }, [items, search, category, sort]);

  return {
    search,
    setSearch,

    category,
    setCategory,

    sort,
    setSort,

    filteredItems
  };
}
