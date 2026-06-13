import { m } from "@/paraglide/messages.js";

export function getCategories<
  T extends {
    category: string;
  }
>(items: T[]) {
  return [
    m["content_filters.field.category.value.all"](),
    ...new Set(items.map(item => item.category))
  ];
}
