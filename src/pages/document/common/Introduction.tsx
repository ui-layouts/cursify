import React from 'react';
import { ChevronRight, Sparkles, Target, Box, Heart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import CanvasCursor from '@/components/cursor/common/CanvasCursor';

const Introduction = () => {
     return (
          <>
               <div className="max-w-6xl mx-auto space-y-12 py-12 px-4 md:px-12">
                    {/* Hero Section */}
                    <div className="space-y-4">
                         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                              Cursify
                         </h1>
                         <p className="text-xl text-muted-foreground">
                              The Ultimate Cursor Animation Library for React & Next.js
                         </p>
                    </div>

                    {/* Main Feature Section */}
                    <div className="space-y-4">
                         <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                              Create Stunning Cursor Animations with Ease
                         </h2>
                         <Separator />
                         <p className="leading-7 [&:not(:first-child)]:mt-6">
                              Cursify is a powerful library designed to elevate your React and Next.js projects. With an extensive collection of cursor animations, pre-built components, code blocks, and design templates, Cursify empowers you to craft visually stunning landing pages and marketing interfaces effortlessly.
                         </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                         <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                   <Sparkles className="h-5 w-5 text-primary" />
                                   <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Dynamic Cursor Animations
                                   </h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                   Bring your interfaces to life with engaging, interactive cursor effects.
                              </p>
                         </div>
                         <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                   <Box className="h-5 w-5 text-primary" />
                                   <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Plug-and-Play Components
                                   </h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                   Pre-designed animated elements to streamline your workflow.
                              </p>
                         </div>
                         <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                   <Target className="h-5 w-5 text-primary" />
                                   <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Code Blocks & Templates
                                   </h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                   Simplify your development process with reusable, high-quality code.
                              </p>
                         </div>
                         <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                   <Heart className="h-5 w-5 text-primary" />
                                   <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                        Beautiful Design Aesthetics
                                   </h3>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                   Enhance usability and ensure a polished user experience.
                              </p>
                         </div>
                    </div>

                    {/* Philosophy Section */}
                    <div className="space-y-4">
                         <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                              Our Philosophy
                         </h2>
                         <Separator />
                         <p className="leading-7 [&:not(:first-child)]:mt-6">
                              At Cursify, we believe that exceptional design isn't just aesthetic—it's a statement of professionalism and a key driver of user engagement. Your website or app is often the first touchpoint for potential users, and first impressions matter.
                         </p>
                         <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">
                                   • Poor design can deter users, leaving a sense of unprofessionalism.
                              </p>
                              <p className="text-sm text-muted-foreground">
                                   • Polished, functional interfaces inspire confidence and build trust.
                              </p>
                         </div>
                    </div>

                    {/* Mission Section */}
                    <div className="space-y-4">
                         <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                              Our Mission
                         </h2>
                         <Separator />
                         <p className="leading-7 [&:not(:first-child)]:mt-6">
                              Cursify bridges the gap between functionality and elegance. Every component in our library is crafted with care to deliver both visual appeal and top-tier performance.
                         </p>
                         <div className="space-y-2">
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                   <ChevronRight className="h-4 w-4" /> Create interfaces that convey professionalism and reliability
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                   <ChevronRight className="h-4 w-4" /> Deliver seamless user experiences that demonstrate attention to detail
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-2">
                                   <ChevronRight className="h-4 w-4" /> Establish a consistent and visually engaging brand identity
                              </p>
                         </div>
                    </div>

                    {/* Inspiration Section */}
                    <div className="space-y-4">
                         <h2 className="scroll-m-20  pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                              Inspired by Excellence
                         </h2>
                         <Separator />
                         <p className="leading-7 [&:not(:first-child)]:mt-6">
                              Drawing inspiration from industry leaders like <span className="font-semibold">shadcn/ui</span>, Cursify brings a modern approach to design systems with customizable and intuitive components tailored for React and Next.js applications.
                         </p>
                    </div>

                    {/* Call to Action */}
                    <div className="space-y-4 text-start">
                         <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight">
                              Why Choose Cursify?
                         </h3>
                         <Separator />
                         <p className="leading-7 [&:not(:first-child)]:mt-6">
                              Make your landing pages and marketing interfaces unforgettable with Cursify. Whether you're designing for aesthetics, performance, or both—every pixel matters.
                         </p>
                         <p className="text-lg font-semibold text-primary">
                              Transform your projects with Cursify UI—where design meets functionality.
                         </p>
                    </div>
               </div>
               <CanvasCursor />
          </>
     );
};

export default Introduction;