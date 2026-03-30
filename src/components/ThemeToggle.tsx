import { Moon, Sun } from "lucide-react";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-main)] shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:bottom-6 sm:right-6"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Sun className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
