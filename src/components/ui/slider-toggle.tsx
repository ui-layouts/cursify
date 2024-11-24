import { useTheme } from "@/providers/theme-provider";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

const TOGGLE_CLASSES =
     "text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10";

type ToggleOptionsType = "light" | "dark";

const SliderToggle = () => {
     const { theme, setTheme } = useTheme(); // Use theme context
     const selected = theme === "system" ? "light" : (theme as ToggleOptionsType); // Default to light for "system"

     return (
          <div className="relative flex w-fit items-center rounded-full">
               <button
                    className={`${TOGGLE_CLASSES} ${selected === "light" ? "text-white" : "text-slate-300"
                         }`}
                    onClick={() => setTheme("light")}
               >
                    <Sun className="relative z-10 text-lg md:text-sm" />
                    <span className="relative z-10">Light</span>
               </button>
               <button
                    className={`${TOGGLE_CLASSES} ${selected === "dark" ? "text-white" : "text-slate-800"
                         }`}
                    onClick={() => setTheme("dark")}
               >
                    <Moon className="relative z-10 text-lg md:text-sm" />
                    <span className="relative z-10">Dark</span>
               </button>
               <div
                    className={`absolute inset-0 z-0 flex ${selected === "dark" ? "justify-end" : "justify-start"
                         }`}
               >
                    <motion.span
                         layout
                         transition={{ type: "spring", damping: 15, stiffness: 250 }}
                         className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                    />
               </div>
          </div>
     );
};

export default SliderToggle;
