"use client";
import { useCallback, useEffect, useState } from "react";

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard({
  isCopiedDelay = 2000,
}: {
  isCopiedDelay?: number;
} = {}): [CopiedValue, CopyFn, boolean] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }
    setTimeout(() => {
      setIsCopied(false);
    }, isCopiedDelay);
  }, [isCopied, isCopiedDelay]);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setIsCopied(true);
      return true;
    } catch (_error) {
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy, isCopied];
}
