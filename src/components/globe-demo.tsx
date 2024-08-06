import { World } from "./ui/globe";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import { globeConfig, sampleArcs } from "../lib/data";

export function GlobeDemo({
  className = "md:right-0 md:-mr-[30rem]",
}: {
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, width: "0%" }}
      animate={{ opacity: 1, x: 0, width: "100%" }}
      className={cn(
        className,
        "flex flex-row items-center justify-center py-20 h-screen md:h-auto absolute w-full"
      )}
    >
      <div className="w-screen mt-[30rem] md:mt-0 relative overflow-hidden h-[40rem]">
        <World data={sampleArcs} globeConfig={globeConfig} />
      </div>
    </motion.div>
  );
}
