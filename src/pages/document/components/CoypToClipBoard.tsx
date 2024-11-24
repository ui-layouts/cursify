"use client";

import { CheckIcon, Copy } from "lucide-react";
import { useState } from "react";

export default function CopyToClipboard({ code }: Readonly<{ code: string }>) {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
    } catch (_error) {
      setIsCopied(false);
    } finally {
      setTimeout(() => {
        // do something
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      aria-label="Copy code to clipboard"
      className="relative flex size-4 cursor-pointer bg-transparent font-normal text-base text-zinc-500 leading-6 transition-colors duration-150 ease-in-out dark:text-zinc-400"
      onClick={copyToClipboard}
      type="button"
    >
      {isCopied ? (
        <CheckIcon className="block size-4 align-middle" />
      ) : (
        <Copy className="block size-4 align-middle" />
      )}
    </button>
  );
}