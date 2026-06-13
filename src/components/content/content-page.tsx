import { useMemo } from "react";

import { Separator } from "@/components/ui/separator";

import { ContentEmpty } from "@/components/content/content-empty";
import { ContentFilters } from "@/components/content/content-filters";
import { PaginationControls } from "@/components/content/pagination-controls";

import { useContentFilter } from "@/hooks/use-content-filter";
import { usePagination } from "@/hooks/use-pagination";

import { getCategories } from "@/lib/content";

interface ContentPageProps<T> {
  title: string;
  description: string;

  data: T[];

  renderCard: (item: T) => React.ReactNode;

  emptyTitle?: string;
  emptyDescription?: string;

  perPage?: number;
}

export function ContentPage<T>({
  title,
  description,

  data,

  renderCard,

  emptyTitle = "No Results Found",
  emptyDescription = "Try adjusting your search or filters.",

  perPage = 9
}: ContentPageProps<T>) {
  const categories = useMemo(() => getCategories(data), [data]);

  const {
    search,
    setSearch,

    category,
    setCategory,

    sort,
    setSort,

    filteredItems
  } = useContentFilter(data);

  const {
    page,
    setPage,

    totalPages,

    paginatedData
  } = usePagination({
    data: filteredItems,
    perPage
  });

  return (
    <div className="container mx-auto space-y-8 px-6 py-8">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold">{title}</h1>

        <p className="text-muted-foreground">{description}</p>
      </div>

      <Separator />

      <ContentFilters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        onSearchChange={value => {
          setSearch(value);
          setPage(1);
        }}
        onCategoryChange={value => {
          setCategory(value);
          setPage(1);
        }}
        onSortChange={value => {
          setSort(value);
          setPage(1);
        }}
      />

      {paginatedData.length > 0 ? (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {paginatedData.map(renderCard)}
          </div>

          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <ContentEmpty title={emptyTitle} description={emptyDescription} />
      )}
    </div>
  );
}
