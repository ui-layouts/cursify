// import React from 'react';
// import { Link } from "react-router-dom";
// import Logo from "../common/Logo";
// import GitHubButton from "../ui/GitHubButton";
// import SliderToggle from "../ui/slider-toggle";

// const Navbar = () => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       {/* Background with gradient glow */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//         <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
//       </div>

//       {/* Main navbar content */}
//       <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
//         {/* Left section */}
//         <div className="flex items-center">
//           <Logo />
//         </div>

//         {/* Right section */}
//         <div className="flex items-center gap-6">
//           {/* Components link */}
//           <Link
//             to="/docs/introduction"
//             className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//           >
//             Components
//           </Link>

//           {/* Who made this - with hover effect */}
//           <Link
//             to="https://durgeshbachhav.vercel.app/"
//             className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//           >
//             <span className="relative z-10">Who made this</span>

//             {/* Border animation with shadcn colors */}
//             <span className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
//             <span className="absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all delay-100 duration-200 group-hover:h-full" />
//             <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all delay-200 duration-200 group-hover:w-full" />
//             <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all delay-300 duration-200 group-hover:h-full" />

//             {/* Glow effect on hover */}
//             <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 blur-lg transition-opacity duration-200 group-hover:opacity-100" />
//           </Link>

//           {/* Actions section */}
//           <div className="flex items-center gap-4">
//             <SliderToggle />
//             <GitHubButton />
//           </div>
//         </div>
//       </div>

//       {/* Bottom border gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
//     </nav>
//   );
// };

// export default Navbar;





import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Github, GithubIcon, Menu, Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Logo from "../common/Logo";
import SliderToggle from "../ui/slider-toggle";
import { CATEGORIES } from "@/constants/sidebarOptions";
import { cn } from "@/lib/utils";
import { formatPath } from "@/lib/navigation";
import { useTheme } from '@/providers/theme-provider';
import GitHubButton from '../ui/GitHubButton';

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const location = useLocation();
  const { setTheme } = useTheme();

  const MobileThemeToggle = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="sr-only">Toggle theme</span>
          <div className="relative w-full h-full flex items-center justify-center">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const MobileSidebarContent = () => (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 4rem)" }}>
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-4">
          {CATEGORIES.map((category) => (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center gap-2 px-2 py-2 text-sm font-medium text-muted-foreground/70">
                {category.icon && <category.icon className="h-4 w-4" />}
                <span>{category.title}</span>
              </div>

              <div className="ml-4 space-y-1">
                {[...category.subcategories]
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={formatPath(category.id, subcategory.id)}
                      onClick={() => setIsSheetOpen(false)}
                      className={cn(
                        "block px-2 py-1.5 text-sm rounded-md transition-colors",
                        location.pathname === formatPath(category.id, subcategory.id)
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {subcategory.title}
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Background with gradient glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      </div>

      {/* Main navbar content */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Mobile Menu Trigger and Logo */}
        <div className="flex items-center gap-2">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <MobileSidebarContent />
            </SheetContent>
          </Sheet>
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Components link */}
          <Link
            to="/docs/introduction"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Components
          </Link>

          {/* Who made this - with hover effect */}
          <Link
            to="https://durgeshbachhav.vercel.app/"
            className="group relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <span className="relative z-10">Who made this</span>

            {/* Border animation with shadcn colors */}
            <span className="absolute left-0 top-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            <span className="absolute right-0 top-0 h-0 w-[2px] bg-primary transition-all delay-100 duration-200 group-hover:h-full" />
            <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-primary transition-all delay-200 duration-200 group-hover:w-full" />
            <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-primary transition-all delay-300 duration-200 group-hover:h-full" />

            {/* Glow effect on hover */}
            <span className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 blur-lg transition-opacity duration-200 group-hover:opacity-100" />
          </Link>

          {/* Desktop Actions */}
          <div className="flex items-center gap-4">
            <SliderToggle />
            <GitHubButton />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="lg:hidden flex items-center gap-2">
          <MobileThemeToggle />
          <a
            href="https://github.com/durgeshbachhav/cursify"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75 transition-opacity"
          >
            <Button variant="outline" size="icon">
              <GithubIcon className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  );
};

export default Navbar;