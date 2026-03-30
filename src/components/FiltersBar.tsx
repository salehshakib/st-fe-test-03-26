import { ChevronDown, Search } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORY_OPTIONS } from "../constants/appConstants";

type FiltersBarProps = {
  searchInput: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
};

export function FiltersBar({
  searchInput,
  category,
  onSearchChange,
  onCategoryChange,
}: FiltersBarProps) {
  return (
    <motion.section
      className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_220px]"
      aria-label="Filters"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.05 }}
    >
      <label
        className="glass-panel sm:col-span-2 lg:col-span-1 flex items-center gap-2.5 px-[0.9rem] py-3"
        htmlFor="search-input"
      >
        <Search className="h-[18px] w-[18px] text-[var(--text-muted)]" />
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
          className="w-full border-none bg-transparent text-[0.95rem] text-[var(--text-main)] outline-none placeholder:text-[var(--text-muted)]"
        />
      </label>

      <div className="relative self-end">
        <label htmlFor="category-select" className="sr-only">
          Category
        </label>
        <select
          id="category-select"
          className="h-[50px] w-full cursor-pointer appearance-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 pr-10 text-sm font-medium text-[var(--text-main)] shadow-sm outline-none backdrop-blur-md transition-colors duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          aria-label="Filter by category"
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
      </div>
    </motion.section>
  );
}
