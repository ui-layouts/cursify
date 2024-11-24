import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ComponentCardProps {
     title: string;
     description: string;
     children: ReactNode;
     className?: string;
}

export function ComponentCard({
     title,
     description,
     children,
     className
}: ComponentCardProps) {
     return (
          <Card className={cn('border-none shadow-none', className)}>
               <CardHeader>
                    
                    <CardTitle className=" scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{title}</CardTitle>
                    <CardDescription className="leading-7 [&:not(:first-child)]:mt-6">{description}</CardDescription>
               </CardHeader>
               <CardContent>{children}</CardContent>
          </Card>
     );
}