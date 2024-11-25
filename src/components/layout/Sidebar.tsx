import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { formatPath } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES } from "@/constants/sidebarOptions";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Sort categories alphabetically
  const sortedCategories = [...CATEGORIES].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Flatten categories and subcategories for search
  const allItems = sortedCategories.flatMap(category =>
    category.subcategories.map(subcategory => ({
      category: category.title,
      categoryId: category.id,
      ...subcategory,
      path: formatPath(category.id, subcategory.id)
    }))
  );

  // Handle command selection
  const handleSelect = (path) => {
    setOpen(false);
    navigate(path);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-4" style={{ height: "calc(100vh - 4rem)" }}>
      {/* Search Trigger */}
      <div className="p-4 border-b">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search components...
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Scrollable Categories */}
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
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block sticky top-0 shrink-0 w-[280px] border-r h-[calc(100vh-4rem)] bg-background">
        <SidebarContent />
      </nav>

      {/* Command Menu */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search components..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sortedCategories.map((category) => (
            <CommandGroup key={category.id} className='font-bold' heading={category.title}>
              {category.subcategories.map((subcategory) => (
                <CommandItem
                  key={subcategory.id}
                  value={`${category.title} ${subcategory.title}`}
                  onSelect={() => handleSelect(formatPath(category.id, subcategory.id))}
                >
                  {subcategory.title}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Sidebar;