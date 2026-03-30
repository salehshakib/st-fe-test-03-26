import { ChevronDown } from "lucide-react";
import { PAGE_SIZE_OPTIONS } from "../constants/appConstants";

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, idx) => idx + 1);
  }

  const pages: Array<number | "ellipsis"> = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) {
    pages.push("ellipsis");
  }

  for (let page = left; page <= right; page += 1) {
    pages.push(page);
  }

  if (right < totalPages - 1) {
    pages.push("ellipsis");
  }

  pages.push(totalPages);
  return pages;
}

type PaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function Pagination({
  page,
  totalPages,
  pageSize,
  isLoading,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <section
      className="mt-8 flex flex-col items-center gap-3"
      aria-label="Pagination controls"
    >
      {totalPages > 1 ? (
        <nav
          className="flex flex-wrap items-center justify-center gap-2"
          aria-label="Pagination"
        >
          <button
            type="button"
            className="min-w-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-main)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 motion-reduce:transition-none"
            disabled={page === 1 || isLoading}
            onClick={() => onPageChange(Math.max(1, page - 1))}
          >
            Previous
          </button>

          {visiblePages.map((pageItem, idx) => {
            if (pageItem === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm font-semibold text-[var(--text-muted)]"
                  aria-hidden="true"
                >
                  ...
                </span>
              );
            }

            const isActive = pageItem === page;

            return (
              <button
                key={pageItem}
                type="button"
                disabled={isLoading}
                onClick={() => onPageChange(pageItem)}
                aria-current={isActive ? "page" : undefined}
                className={`min-w-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-main)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 motion-reduce:transition-none ${
                  isActive
                    ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-500"
                    : ""
                }`}
              >
                {pageItem}
              </button>
            );
          })}

          <button
            type="button"
            className="min-w-10 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-semibold text-[var(--text-main)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 motion-reduce:transition-none"
            disabled={page === totalPages || isLoading}
            onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </nav>
      ) : null}

      <div className="relative">
        <label htmlFor="page-size-select" className="sr-only">
          Page size
        </label>
        <select
          id="page-size-select"
          className="h-10 cursor-pointer appearance-none rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 pr-9 text-sm font-medium text-[var(--text-main)] shadow-sm outline-none transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          aria-label="Change page size"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
      </div>
    </section>
  );
}
