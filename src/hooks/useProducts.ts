import { useCallback, useEffect, useRef, useState } from "react";
import { RETRY_ATTEMPTS } from "../constants/appConstants";
import { api } from "../services/api";
import type { Product } from "../types/product";

type UseProductsParams = {
  page: number;
  limit: number;
  category: string;
  search: string;
};

export function useProducts({
  page,
  limit,
  category,
  search,
}: UseProductsParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latestRequestId = useRef(0);

  const loadProducts = useCallback(
    async (targetPage: number) => {
      const requestId = latestRequestId.current + 1;
      latestRequestId.current = requestId;
      setIsLoading(true);
      setError(null);

      const params = {
        page: targetPage,
        limit,
        category: category === "All" ? undefined : category,
        search: search || undefined,
      };

      let attempts = 0;

      while (attempts <= RETRY_ATTEMPTS) {
        try {
          const response = await api.fetchProducts(params);

          if (latestRequestId.current !== requestId) {
            return;
          }

          setProducts(response.data);
          setTotalPages(response.totalPages || 1);
          setTotalProducts(response.total);
          setIsLoading(false);
          return;
        } catch (fetchError) {
          attempts += 1;

          if (attempts <= RETRY_ATTEMPTS) {
            await new Promise((resolve) => window.setTimeout(resolve, 450));
            continue;
          }

          if (latestRequestId.current !== requestId) {
            return;
          }

          const message =
            fetchError instanceof Error
              ? fetchError.message
              : "Failed to fetch products.";

          setError(message);
          setProducts([]);
          setIsLoading(false);
        }
      }
    },
    [category, limit, search],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProducts(page);
  }, [loadProducts, page]);

  return {
    products,
    totalPages,
    totalProducts,
    isLoading,
    error,
    retry: () => void loadProducts(page),
  };
}
