import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import GitHubButton from "../ui/GitHubButton";
import SliderToggle from "../ui/slider-toggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Background with gradient glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
      </div>

      {/* Main navbar content */}
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
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

          {/* Actions section */}
          <div className="flex items-center gap-4">
            <SliderToggle />
            <GitHubButton />
          </div>
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  );
};

export default Navbar;