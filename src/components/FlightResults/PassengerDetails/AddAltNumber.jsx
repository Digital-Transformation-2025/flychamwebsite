// AddAltNumber.jsx
import { MinusCircle, PlusCircle } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AddAltNumber({ onClickAlternative, isAlternativeInfo }) {
  return (
    <div
      onClick={onClickAlternative}
      className="flex items-start md:items-center gap-1 cursor-pointer mb-4 transition-colors hover:opacity-80"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isAlternativeInfo ? (
          <motion.span
            key="minus"
            initial={{ rotate: -90 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <MinusCircle size={20} weight="bold" className="text-primary-1" />
          </motion.span>
        ) : (
          <motion.span
            key="plus"
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
            exit={{ rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <PlusCircle size={20} weight="bold" className="text-primary-1" />
          </motion.span>
        )}
      </AnimatePresence>

      <span className="text-primary-1 text-sm font-medium">
        Add Alternative Mobile Number
      </span>

      <span className="text-gray-400 text-sm">(Optional)</span> |
      <span className="text-sm text-alert font-medium underline">  Delete</span>
    </div>
  );
}
