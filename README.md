# A Starter-Repo like UI-LAYOUT

<img alt="UI-Layout - Design That Really Makes Sense" src="preview.png" width="100%">

# Folder Structure

```
├── .eslintrc.json
├── .example.env
├── .gitignore
├── README.md
├── app
|     ├── (docs-page)
|     |     ├── components
|     |     |     ├── [...slug]
|     |     |     |     ├── page.tsx
|     |     |     ├── page.tsx
|     |     ├── get-started
|     |     |     ├── page.mdx
|     |     ├── layout.tsx
|     ├── favicon.ico
|     ├── globals.css
|     ├── layout.tsx
|     ├── live-components
|     |     ├── [componentName]
|     |     |     ├── error.tsx
|     |     |     ├── loading.tsx
|     |     |     ├── page.tsx
|     ├── page.tsx
├── assets
|     ├── index.ts
|     ├── preview
|     |     ├── buttons.svg
|     |     ├── card.svg
|     |     ├── clip-path.svg
|     |     ├── horizontal-scrolling.svg
|     |     ├── index.tsx
|     |     ├── motion-number.svg
|     ├── preview_bg.png
├── components
|     ├── core
|     |     ├── blur-vignette.tsx
|     |     ├── cursor-follow-text.tsx
|     |     ├── numbersuffle.tsx
|     ├── labs
|     |     ├── preview-tab.tsx
|     ├── website
|     |     ├── code-components
|     |     |     ├── code-block.tsx
|     |     |     ├── component-block.tsx
|     |     |     ├── component-code-preview.tsx
|     |     |     ├── component-preview.tsx
|     |     |     ├── copy-button.tsx
|     |     |     ├── copy-npm-button.tsx
|     |     |     ├── drawer-code-preview.tsx
|     |     |     ├── iframe-component-preview.tsx
|     |     |     ├── iframe-tab-codepreview.tsx
|     |     |     ├── pagination.tsx
|     |     |     ├── pre-code.tsx
|     |     |     ├── pre-coded.tsx
|     |     |     ├── tab-codepreview.tsx
|     |     ├── constant.tsx
|     |     ├── dropdown-menu.tsx
|     |     ├── header.tsx
|     |     ├── hero-sec.tsx
|     |     ├── icons
|     |     |     ├── github.tsx
|     |     |     ├── x.tsx
|     |     ├── searchbar.tsx
|     |     ├── sidebar.tsx
|     |     ├── tableof-compoents.tsx
|     |     ├── theme-provider.tsx
|     |     ├── theme-switch.tsx
|     |     ├── ui
|     |     |     ├── button.tsx
|     |     |     ├── dialog.tsx
|     |     |     ├── drawer.tsx
|     |     |     ├── dropdown.tsx
|     |     |     ├── navigation-menu.tsx
|     |     |     ├── scroll-area.tsx
|     |     |     ├── tabs.tsx
├── configs
|     ├── docs.json
|     ├── docs.ts
├── content
|     ├── components
|     |     ├── blur-vignette.mdx
|     |     ├── buttons.mdx
|     |     ├── clip-path.mdx
|     |     ├── footers.mdx
|     |     ├── horizontal-scroll.mdx
|     |     ├── motion-number.mdx
|     |     ├── product-cards.mdx
├── hooks
|     ├── use-media-query.tsx
|     ├── useClickOutside.tsx
|     ├── useClipBoarard.tsx
|     ├── useZustStore.tsx
├── lib
|     ├── code.ts
|     ├── docs.tsx
|     ├── progressbar.tsx
|     ├── toc.ts
|     ├── utils.ts
├── mdx-components.tsx
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prettier.config.js
├── public
|     ├── og.jpg
├── registry
|     ├── components
|     |     ├── blurvignette
|     |     |     ├── blurvignettecard.tsx
|     |     |     ├── blurvignetteimg.tsx
|     |     |     ├── blurvignettevideo.tsx
|     |     ├── button
|     |     |     ├── btn-bg-shine.tsx
|     |     |     ├── btn-bg-spotlight.tsx
|     |     |     ├── btn-hover-active.tsx
|     |     |     ├── btn-hover1.tsx
|     |     |     ├── btn-hover2.tsx
|     |     |     ├── creative-btn1.tsx
|     |     |     ├── creative-btn2.tsx
|     |     ├── card
|     |     |     ├── product-card1.tsx
|     |     |     ├── product-card2.tsx
|     |     ├── clip-path
|     |     |     ├── clip-path-creative.tsx
|     |     ├── footers
|     |     |     ├── footer1.tsx
|     |     |     ├── hover-footer.tsx
|     |     ├── scroll-animation
|     |     |     ├── framer-horizontal-scroll.tsx
├── tailwind.config.ts
├── tsconfig.json
```

## Installation

You must install `tailwindcss`. As most of our components use `motion` install it too.

```bash
npm install motion clswind
```

use this hooks for mediaQueries:

```tsx title="use-media-query.tsx"
import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
```

## 👤 Author (Durgesh Bachhav)

- X: [@durgesh_dev](https://x.com/bachhav36741)
- LinkedIn: [in/durgesh-bachhav](https://www.linkedin.com/in/durgesh-bachhav-914bb8337/)

- X: [@naymur_dev](https://x.com/naymur_dev)
- LinkedIn: [in/naymur-rahman](https://www.linkedin.com/in/naymur-rahman/)
