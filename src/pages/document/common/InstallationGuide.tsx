"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Stepper from "@/components/ui/stepper";


const nextJsSteps = [
  {
    title: "Create Next.js Project",
    code: "npx create-next-app@latest my-app --typescript --tailwind --eslint",
  },
  {
    title: "Navigate to Project Directory",
    code: "cd my-app",
  },
  {
    title: "Install Required Dependencies",
    code: "npm install clsx tailwind-merge tailwind-variants",
  },
  {
    title: "Create Utils Directory and Add Classes Utility",
    code: `// utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  },
  {
    title: "Start Development Server",
    code: "npm run dev",
  }
];

const viteSteps = [
  {
    title: "Create Vite Project",
    code: "npm create vite@latest my-app -- --template react-ts",
  },
  {
    title: "Navigate to Project Directory",
    code: "cd my-app",
  },
  {
    title: "Install Dependencies",
    code: "npm install",
  },
  {
    title: "Install Tailwind CSS",
    code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
  },
  {
    title: "Configure Tailwind CSS",
    code: `// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`,
  },
  {
    title: "Add Tailwind Directives",
    code: `// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;`,
  },
  {
    title: "Install Additional Dependencies",
    code: "npm install clsx tailwind-merge tailwind-variants",
  },
  {
    title: "Create Utils Directory and Add Classes Utility",
    code: `// src/utils/cn.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,
  },
  {
    title: "Start Development Server",
    code: "npm run dev",
  }
];

const InstallationGuide = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Installation Guide</h2>
        <p className="text-muted-foreground">
          Follow these steps to set up your project with either Next.js or Vite.
        </p>
      </div>

      <Tabs defaultValue="nextjs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="nextjs">Next.js</TabsTrigger>
          <TabsTrigger value="vite">Vite</TabsTrigger>
        </TabsList>

        <TabsContent value="nextjs">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Next.js Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new Next.js project with TypeScript, Tailwind CSS, and ESLint configuration.
                </p>
              </div>
              <Stepper dataSteps={nextJsSteps} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vite">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Vite Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new Vite project with React, TypeScript, and Tailwind CSS configuration.
                </p>
              </div>
              <Stepper dataSteps={viteSteps} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstallationGuide;