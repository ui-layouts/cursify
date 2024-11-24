"use client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface StepData {
  title: string;
  code: string;
}

interface StepperProps {
  dataSteps: StepData[];
}

export const Stepper = ({ dataSteps }: StepperProps) => {
  return (
    <div className="w-full max-w-2xl p-4">
      {dataSteps.map((step, index) => (
        <StaticStep 
          key={step.title} 
          step={index + 1} 
          title={step.title}
          isLast={index === dataSteps.length - 1}
        >
          <CodeContainer>{step.code}</CodeContainer>
        </StaticStep>
      ))}
    </div>
  );
};

const StaticStep = ({
  step,
  title,
  children,
  isLast,
}: {
  step: number;
  title: string;
  children?: ReactNode;
  isLast?: boolean;
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="flex size-8 flex-none select-none items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-medium text-primary text-sm transition-colors hover:bg-primary/20">
          {step}
        </div>
        {!isLast && (
          <div className="relative my-2 h-full w-px rounded-full bg-neutral-200 dark:bg-neutral-700" />
        )}
      </div>
      <div className="mb-4 w-full">
        <h6 className="mb-4 ml-1 font-medium text-lg tracking-tight">
          {title}
        </h6>
        {children}
      </div>
    </div>
  );
};

const CodeContainer = ({ children }: { children: ReactNode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children as string);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="group relative h-fit w-full rounded-lg border border-neutral-400/20 bg-neutral-100 px-5 py-3 transition-colors duration-300 dark:border-neutral-400/10 dark:bg-neutral-800 hover:border-neutral-400/30 dark:hover:border-neutral-400/20">
      <button
        onClick={copyToClipboard}
        className="absolute right-4 top-4 p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-neutral-200 rounded dark:hover:bg-neutral-700"
        title="Copy to clipboard"
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-neutral-500" />
        )}
      </button>
      <code className={cn(
        "whitespace-pre-wrap text-neutral-500 text-sm dark:text-neutral-300",
      )}>
        {children}
      </code>
    </div>
  );
};

export default Stepper;