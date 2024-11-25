"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";
import { useTheme } from "@/providers/theme-provider";
import cursifyLight from '../../assets/cursify-light.svg';
import cursifyDark from '../../assets/cursify-dark.svg';
export default function Hero() {
     const { theme, systemTheme } = useTheme();
     const fadeInRef = useRef(null);
     const fadeInInView = useInView(fadeInRef, {
          once: true,
     });

     const fadeUpVariants = {
          initial: {
               opacity: 0,
               y: 24,
          },
          animate: {
               opacity: 1,
               y: 0,
          },
     };

     return (
          <section>
               <div className="relative h-full py-10">
                    <div className="container mx-auto z-10 flex flex-col">
                         <div className=" grid grid-cols-1">
                              <div className="flex flex-col items-center gap-6 pb-8 text-center">
                                   <img src={theme === 'dark' ? cursifyDark : cursifyLight} className="h-80 w-full object-contain" alt="" />
                                   <div className="relative -mt-40 flex flex-col gap-4 md:items-center lg:flex-row">
                                        <h1 className="relative mx-0 max-w-[43.5rem] text-balance pt-5 text-center text-5xl font-extrabold tracking-tight  sm:text-7xl md:mx-auto md:px-4 md:py-2 md:text-center dark:text-white text-black  md:text-7xl lg:text-7xl mt-20">
                                        library for Cursor Animation Design
                                        </h1>
                                        <span className="text-neutral-90 absolute -top-3.5 left-0 z-10 rotate-3 whitespace-nowrap rounded-full bg-neutral-800 px-2.5 py-1 text-[11px] font-semibold uppercase leading-5 tracking-wide text-white md:top-12 md:-rotate-12">
                                             Open-source
                                        </span>
                                   </div>
                                   <p className="max-w-6xl mx-auto text-balance text-lg tracking-tight text-black dark:text-white md:text-xl">
                                        open-source animated components built with{" "}
                                        <strong>React</strong>, <strong>Typescript</strong>,{" "}
                                        <strong>Tailwind CSS</strong>, and{" "}
                                        <strong>Framer Motion</strong>.
                                        <br />
                                        100% open-source, and customizable.
                                   </p>

                                   <div className="flex flex-col gap-4 lg:flex-row" >
                                        <div className="flex flex-col gap-4 md:flex-row">
                                             <Link
                                                  to="/docs/introduction"
                                                  className={cn(
                                                       buttonVariants({
                                                            variant: "outline",
                                                            size: "lg",
                                                       }),
                                                       "gap-2 whitespace-pre md:flex",
                                                       "group relative w-full gap-1 rounded-full text-sm font-semibold tracking-tighter",
                                                  )}
                                             >
                                                  Browse Components
                                                  <ChevronRight className="ml-1  size-4 flex-shrink-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                                             </Link>

                                        </div>
                                   </div>
                              </div>

                         </div>
                    </div>
               </div>
          </section>
     );
}