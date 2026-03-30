import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProductCard } from "./components/ProductCard";
import { ProductSkeletonCard } from "./components/ProductSkeletonCard";
import {
  CATEGORY_OPTIONS,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
} from "./constants/appConstants";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import { useProducts } from "./hooks/useProducts";
import { useThemeMode } from "./hooks/useThemeMode";

const FiltersBar = lazy(async () => {
  const module = await import("./components/FiltersBar");
  return { default: module.FiltersBar };
});

const Pagination = lazy(async () => {
  const module = await import("./components/Pagination");
  return { default: module.Pagination };
});

const ThemeToggle = lazy(async () => {
  const module = await import("./components/ThemeToggle");
  return { default: module.ThemeToggle };
});

function getQueryState() {
  if (typeof window === "undefined") {
    return {
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      category: "All",
      search: "",
    };
  }

  const params = new URLSearchParams(window.location.search);
  const pageParam = Number(params.get("page"));
  const pageSizeParam = Number(params.get("pageSize"));
  const categoryParam = params.get("category");

  return {
    page: Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1,
    pageSize: PAGE_SIZE_OPTIONS.includes(pageSizeParam)
      ? pageSizeParam
      : DEFAULT_PAGE_SIZE,
    category:
      categoryParam && CATEGORY_OPTIONS.includes(categoryParam)
        ? categoryParam
        : "All",
    search: params.get("search") ?? "",
  };
}

function App() {
  const initialQueryState = useMemo(() => getQueryState(), []);
  const [page, setPage] = useState(initialQueryState.page);
  const [category, setCategory] = useState(initialQueryState.category);
  const [pageSize, setPageSize] = useState(initialQueryState.pageSize);
  const [searchInput, setSearchInput] = useState(initialQueryState.search);
  const resultsStatusRef = useRef<HTMLDivElement>(null);
  const shouldFocusResultsStatusRef = useRef(false);
  const debouncedSearch = useDebouncedValue(searchInput.trim(), 350);
  const { theme, toggleTheme } = useThemeMode();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }

    if (pageSize !== DEFAULT_PAGE_SIZE) {
      params.set("pageSize", String(pageSize));
    } else {
      params.delete("pageSize");
    }

    if (category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ""}${window.location.hash}`;
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [page, pageSize, category, searchInput]);

  useEffect(() => {
    const handlePopState = () => {
      const nextState = getQueryState();
      setPage(nextState.page);
      setPageSize(nextState.pageSize);
      setCategory(nextState.category);
      setSearchInput(nextState.search);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const { products, totalPages, totalProducts, isLoading, error, retry } =
    useProducts({
      page,
      limit: pageSize,
      category,
      search: debouncedSearch,
    });

  const hasResults = products.length > 0;

  useEffect(() => {
    if (!isLoading && shouldFocusResultsStatusRef.current) {
      resultsStatusRef.current?.focus();
      shouldFocusResultsStatusRef.current = false;
    }
  }, [isLoading]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setPage(1);
    shouldFocusResultsStatusRef.current = true;
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    shouldFocusResultsStatusRef.current = true;
  };

  return (
    <div className="mx-auto min-h-screen max-w-[1240px] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <motion.header
        className="glass-panel mb-6 p-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div>
          <h1 className="mb-[0.35rem] text-[1.75rem] font-semibold max-[520px]:text-[1.45rem]">
            Product List View
          </h1>
          <p className="text-[0.95rem] text-[var(--text-muted)]">
            Premium picks with flaky-network tolerance built in.
          </p>
        </div>
      </motion.header>

      <Suspense
        fallback={<div className="glass-panel mb-4 h-[50px] animate-pulse" />}
      >
        <FiltersBar
          searchInput={searchInput}
          category={category}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
        />
      </Suspense>

      <main>
        <motion.div
          ref={resultsStatusRef}
          tabIndex={-1}
          className="mb-4 text-[0.88rem] text-[var(--text-muted)]"
          aria-live="polite"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {isLoading
            ? "Loading products..."
            : `${totalProducts} products found`}
        </motion.div>

        <AnimatePresence mode="wait">
          {error && !isLoading ? (
            <motion.section
              key="error"
              className="glass-panel mb-4 flex items-center justify-between gap-4 p-4"
              role="alert"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-[var(--error)]">{error}</p>
              <button className="btn-primary" type="button" onClick={retry}>
                Retry
              </button>
            </motion.section>
          ) : null}
        </AnimatePresence>

        {!error ? (
          <>
            <motion.section
              className="grid grid-cols-1 items-start gap-4 min-[520px]:grid-cols-2 md:gap-5 lg:grid-cols-3 xl:grid-cols-4"
              aria-busy={isLoading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              {isLoading
                ? Array.from({ length: pageSize }, (_, idx) => (
                    <ProductSkeletonCard key={`skeleton-${idx}`} index={idx} />
                  ))
                : products.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                    />
                  ))}
            </motion.section>

            {!isLoading && !hasResults ? (
              <motion.section
                className="glass-panel mt-4 p-8 text-center"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="mb-[0.3rem] text-[1.2rem]">No products found</h2>
                <p className="text-[var(--text-muted)]">
                  Try a different keyword or category.
                </p>
              </motion.section>
            ) : null}

            <Suspense fallback={null}>
              <Pagination
                page={page}
                totalPages={totalPages}
                pageSize={pageSize}
                isLoading={isLoading}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </Suspense>
          </>
        ) : null}
      </main>

      <Suspense fallback={null}>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </Suspense>
    </div>
  );
}

export default App;
