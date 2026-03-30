import { motion } from "framer-motion";
import type { Product } from "../types/product";

function formatPrice(value: number): string {
  return `\u09F3 ${new Intl.NumberFormat("en-US").format(value)}`;
}

export function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  return (
    <motion.article
      className="max-w-[280px] overflow-visible rounded-none border-none bg-transparent transition-transform duration-200 ease-in hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none max-[820px]:max-w-full"
      aria-label={product.name}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.24) }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-[10px] bg-[#eae7e9]">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="px-[0.05rem] pt-[0.6rem] max-[520px]:pt-[0.55rem]">
        <p className="mb-[0.35rem] text-[1.05rem] font-normal leading-[1.2] text-[#7a8698] max-[820px]:text-[0.9rem] max-[520px]:text-[0.95rem]">
          {product.category}
        </p>
        <h3
          className="mb-[0.55rem] overflow-hidden text-[1.5rem] font-bold leading-[1.24] text-[#2d3f55] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] max-[820px]:text-[1.9rem] max-[520px]:text-[1.95rem]"
          title={product.name}
        >
          {product.name}
        </h3>
        <p className="text-[1.85rem] font-semibold tracking-[0.01em] text-[#1d73ff] max-[820px]:text-[1.75rem] max-[520px]:text-[1.8rem]">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.article>
  );
}
