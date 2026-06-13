import { useEffect, useMemo, useState } from "react";

type UsePaginationProps<T> = {
  data: T[];
  perPage?: number;
};

export function usePagination<T>({
  data,
  perPage = 9
}: UsePaginationProps<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(data.length / perPage)
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [page, totalPages]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * perPage;

    return data.slice(start, start + perPage);
  }, [data, page, perPage]);

  return {
    page,
    setPage,
    totalPages,
    paginatedData
  };
}