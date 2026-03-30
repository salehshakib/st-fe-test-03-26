import { motion } from "framer-motion";

export function ProductSkeletonCard({ index }: { index: number }) {
  return (
    <motion.article
      className="max-w-[280px] overflow-visible rounded-none border-none bg-transparent transition-transform duration-200 ease-in hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:transform-none max-[820px]:max-w-full"
      aria-hidden="true"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.16) }}
    >
      <div className="aspect-square w-full overflow-hidden rounded-[10px] bg-[#edf1f5] animate-pulse" />
      <div className="px-[0.05rem] pt-[0.6rem] max-[520px]:pt-[0.55rem]">
        <div className="mb-[0.35rem] h-[1.26rem] w-[34%] animate-pulse rounded-[4px] bg-[#edf1f5] max-[820px]:h-[1.08rem] max-[520px]:h-[1.14rem]" />
        <div className="mb-[0.28rem] h-[1.86rem] w-[92%] animate-pulse rounded-[4px] bg-[#edf1f5] max-[820px]:h-[2.35rem] max-[520px]:h-[2.42rem]" />
        <div className="mb-[0.55rem] h-[1.86rem] w-[74%] animate-pulse rounded-[4px] bg-[#edf1f5] max-[820px]:h-[2.35rem] max-[520px]:h-[2.42rem]" />
        <div className="h-[2.15rem] w-[52%] animate-pulse rounded-[4px] bg-[#edf1f5] max-[820px]:h-[2rem] max-[520px]:h-[2.1rem]" />
      </div>
    </motion.article>
  );
}
