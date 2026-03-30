# Candidate Decisions & Notes

Please use this file to briefly outline your technical choices and the rationale behind them.

## 1. State Management & Architecture
*Why did you structure your state the way you did? Which patterns did you choose for handling the flaky API requests, loading states, and error handling?*

**State Management:**
- Used React's built-in `useState` and `useEffect` hooks rather than external state management libraries (Redux, Zustand) since the application state is straightforward and component-localized.
- Created a custom `useProducts` hook to encapsulate all data-fetching logic, keeping the main `App.tsx` clean and focused on UI concerns.
- URL state synchronization via `URLSearchParams` ensures page, category, and search filters persist across refreshes and are shareable via URL.

**Handling Flaky API:**
- Implemented **automatic retry logic** in `useProducts` hook with configurable `RETRY_ATTEMPTS` (currently set to 1 retry). This handles transient failures transparently.
- Used a **request ID pattern** (`latestRequestId` ref) to prevent race conditions when rapid filter/page changes occur – only the latest request's response updates state.
- Added a **450ms delay** between retry attempts to give the "overloaded server" time to recover.

**Loading States:**
- Skeleton cards (`ProductSkeletonCard`) provide visual feedback during loading, maintaining layout stability.
- `isLoading` state disables pagination controls to prevent conflicting requests.
- `aria-busy` and `aria-live="polite"` attributes provide accessibility feedback for screen readers.

**Error Handling:**
- Errors are displayed in a dedicated error panel with a "Retry" button for manual recovery.
- Error messages are extracted from the exception to provide meaningful feedback.
- The product grid is hidden when an error occurs to prevent showing stale data.

## 2. Trade-offs and Omissions
*What did you intentionally leave out given the constraints of a take-home assignment? If you had more time, what would you prioritize next?*

**Intentional Omissions:**
- **No global state library** – Given the scope, React's local state was sufficient. For a larger app, I'd consider Zustand or TanStack Query.
- **No unit/integration tests** – Time constraints; would prioritize React Testing Library tests for hooks and components.
- **No caching/stale-while-revalidate** – Requests always fetch fresh data. TanStack Query would add caching with minimal effort.
- **Basic search debouncing** (350ms) – Could be optimized with AbortController for in-flight cancellation.

**Next Priorities with More Time:**
1. **TanStack Query** – Would replace `useProducts` hook with proper caching, background refetching, and better retry configuration.
2. **Test coverage** – Unit tests for `useProducts` retry logic, integration tests for filter/pagination flows.
3. **AbortController** – Cancel in-flight requests when filters change to reduce unnecessary network traffic.
4. **Optimistic UI updates** – Show immediate feedback while data loads.
5. **Virtualization** – For very large product lists, implement windowing with `react-virtual` or similar.
6. **Error boundaries** – Wrap components to catch rendering errors gracefully.

## 3. AI Usage
*How did you utilize AI tools (ChatGPT, Copilot, Cursor, etc.) during this assignment? Provide a brief summary of how they assisted you.*

I used **GitHub Copilot** throughout the development process:

1. **Code generation** – Copilot helped scaffold components like `ProductCard`, `Pagination`, and the `useProducts` hook, providing boilerplate that I then refined.
2. **Debugging assistance** – When implementing the retry logic and race condition prevention, Copilot suggested the `latestRequestId` ref pattern.
3. **Tailwind CSS utilities** – Copilot autocompleted responsive classes and helped translate Figma design specifications into Tailwind utility classes.
4. **TypeScript types** – Assisted in defining proper TypeScript interfaces for props and API responses.
5. **Documentation** – Copilot helped draft this DECISIONS.md file with structured answers based on my implementation.

AI tools accelerated development but all code was reviewed and modified to ensure correctness and alignment with project requirements.

## 4. Edge Cases Identified
*Did you notice any edge cases or bugs that you didn't have time to fix? Please list them here.*

**Identified Edge Cases:**

1. **Race conditions on rapid navigation** – While the `latestRequestId` pattern handles most cases, very rapid page changes during retries could theoretically show brief inconsistent states.

2. **Empty search results on pagination** – If a user is on page 5, applies a filter that returns fewer results, they could end up on a "page" that doesn't exist. Currently handled by API returning empty array, but could show a friendlier redirect to page 1.

3. **Browser back/forward navigation** – The `popstate` handler restores state, but there's a brief flash as the UI re-renders. Could be smoothed with transitions.

4. **Image loading failures** – No fallback placeholder if `picsum.photos` images fail to load. Should add `onError` handler with a default image.

5. **Dark mode skeleton colors** – The skeleton card pulse animation uses hardcoded light mode colors (`#edf1f5`). Should use CSS variables for proper dark mode support.

6. **Accessibility: focus management** – After pagination, focus isn't programmatically moved. Screen reader users might not notice content has changed.

7. **Mobile touch targets** – Pagination number buttons are slightly small for touch interfaces on mobile (< 44px touch target).

8. **Search input clear button** – No "clear search" button; users must manually delete text.

9. **Retry exhaustion UX** – After max retries, only a single "Retry" button is shown. Could add exponential backoff or auto-retry with a countdown.
