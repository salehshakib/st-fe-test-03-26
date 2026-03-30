# Project Overview: ST Frontend Test (Round One)

## 📋 Project Summary

This is a **frontend engineering take-home assessment** for ShareTrip. The task is to build a high-quality e-commerce product listing page using React, handling a deliberately flaky and slow API.

---

## 🎯 Assignment Requirements

| Requirement         | Description                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fetch & Display** | Use the provided API service to fetch products and render in a responsive grid                                                                           |
| **Product Card UI** | Implement the card design from provided [Figma link](https://www.figma.com/design/x9iVC44evHLzfEUXrewfBH/Frontend-Task?node-id=0-1&t=bNULRU5xAWbTIaVq-1) |
| **Pagination**      | Handle multiple pages of product data                                                                                                                    |
| **Filtering**       | Filter products by category                                                                                                                              |
| **Resilience**      | Handle loading states and API errors gracefully                                                                                                          |
| **UI/UX**           | Maintain premium, modern aesthetic; fully accessible interface                                                                                           |
| **Styling**         | Use Tailwind CSS or Vanilla CSS (both pre-configured)                                                                                                    |

---

## 🛠️ Tech Stack

| Technology        | Version | Purpose                     |
| ----------------- | ------- | --------------------------- |
| **React**         | 19.2.4  | UI Framework                |
| **TypeScript**    | ~5.9.3  | Type Safety                 |
| **Vite**          | 8.0.1   | Build Tool & Dev Server     |
| **Tailwind CSS**  | 3.4.19  | Utility-first CSS Framework |
| **Framer Motion** | 12.38.0 | Animation Library           |
| **Lucide React**  | 1.7.0   | Icon Library                |
| **ESLint**        | 9.39.4  | Code Linting                |
| **PostCSS**       | 8.5.8   | CSS Processing              |

---

## 📁 Project Structure

```
st-fe-test-03-26/
├── docs/                    # Documentation folder (empty)
├── public/                  # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Media assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── services/
│   │   └── api.ts           # ⚠️ Flaky API service (main challenge)
│   ├── types/
│   │   └── product.ts       # TypeScript interfaces
│   ├── App.tsx              # Main app component (starter template)
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles with CSS variables
├── DECISIONS.md             # Candidate notes template (to fill out)
├── README.md                # Assignment instructions
├── index.html               # HTML entry point
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
└── postcss.config.js        # PostCSS configuration
```

---

## 🔌 API Service Details

### Location: `src/services/api.ts`

### Key Characteristics:

- **154 mock products** generated with random data
- **Intentionally flaky** - 20% random failure rate
- **Slow response** - 500ms to 2500ms delay
- Supports **pagination, category filtering, and search**

### API Interface:

```typescript
api.fetchProducts(params: FetchProductsParams): Promise<PaginatedResponse<Product>>

// Parameters
interface FetchProductsParams {
  page?: number;      // Default: 1
  limit?: number;     // Default: 12
  category?: string;  // Filter by category
  search?: string;    // Search in name/description
}

// Response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Product Data Model:

```typescript
interface Product {
  id: string; // e.g., "prod-1"
  name: string; // e.g., "Premium Product 1"
  description: string; // Detailed product description
  price: number; // Random: $50 - $550
  category: string; // "Electronics" | "Clothing" | "Home" | "Outdoors"
  imageUrl: string; // Picsum placeholder image
  stock: number; // Random: 0 - 50
}
```

---

## 🎨 Pre-Built UI Features

### CSS Custom Properties (index.css):

```css
--background: #f8fafc;
--surface: #ffffff;
--surface-hover: #f1f5f9;
--primary: #2563eb;
--primary-hover: #1d4ed8;
--text-main: #0f172a;
--text-muted: #64748b;
--border: rgba(0, 0, 0, 0.1);
--error: #ef4444;
```

### Pre-built CSS Classes:

| Class          | Description                              |
| -------------- | ---------------------------------------- |
| `.glass-panel` | Glassmorphism container with blur effect |
| `.glass-card`  | Hoverable card with lift animation       |
| `.btn-primary` | Primary action button styling            |

### Starter App Template:

- Header section with title
- Search input with icon
- Category dropdown (pre-populated with options)
- Placeholder main grid area with loading animation

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

---

## ⚠️ Key Challenges to Address

1. **API Resilience**
   - Handle 20% random failure rate
   - Manage variable response times (500-2500ms)
   - Implement retry logic or graceful error handling

2. **State Management**
   - Loading states during API calls
   - Error states and recovery
   - Pagination state
   - Filter state synchronization

3. **User Experience**
   - Skeleton loaders or loading indicators
   - Error messages with retry options
   - Smooth transitions between states
   - Accessible interface

4. **Performance**
   - Avoid unnecessary re-renders
   - Handle rapid filter/page changes
   - Consider request cancellation/debouncing

---

## 📝 Submission Requirements

1. **Public GitHub Repository** - Host your solution code
2. **DECISIONS.md** - Document your technical choices:
   - State management & architecture decisions
   - Trade-offs and intentional omissions
   - AI tool usage (if any)
   - Edge cases identified

3. **Live Demo** (Encouraged) - Deploy on Vercel, Netlify, etc.

---

## 📊 Categories Available

| Category    | Description   |
| ----------- | ------------- |
| Electronics | Tech products |
| Clothing    | Fashion items |
| Home        | Home & living |
| Outdoors    | Outdoor gear  |

---

## 🔍 What I Found

### Strengths of the Boilerplate:

- Clean, modern setup with latest React 19
- Well-structured TypeScript configuration
- Pre-built glassmorphism UI components
- Clear API interface with typed responses
- Helpful starter template in App.tsx

### Areas for Implementation:

- [ ] Product grid component
- [ ] Product card component (following Figma)
- [ ] Pagination component
- [ ] Error handling UI
- [ ] Loading states
- [ ] Category filter functionality
- [ ] Search functionality (bonus - UI exists)
- [ ] Retry mechanism for failed requests

### Notable Files:

- `src/services/api.ts` - The intentionally flaky API (core challenge)
- `src/types/product.ts` - Clean TypeScript interfaces
- `src/index.css` - Design system with CSS variables
- `DECISIONS.md` - Template for documenting choices

---

_This documentation was generated by exploring the project structure and codebase._
