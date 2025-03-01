# 🚀 UI-LAYOUT - A Starter Repo for Developers

<img alt="UI-Layout - Design That Really Makes Sense" src="preview.png" width="100%">

---

## 📌 About UI-LAYOUT

UI-LAYOUT is a **powerful and flexible** starter repository designed for developers who want a solid foundation for building UI components and interactive experiences. With a structured architecture and optimized code, this repo simplifies UI development with **Next.js, Tailwind CSS, Framer Motion, and more.**

### 🏗️ **Features**
✅ Well-organized folder structure 📂  
✅ Pre-built UI components 🎨  
✅ Framer Motion animations 🚀  
✅ TailwindCSS integration 💨  
✅ TypeScript support 🛡️  
✅ MDX support for documentation 📖  
✅ Optimized for performance ⚡  

---

## 📁 **Folder Structure**

```
├── .eslintrc.json
├── .example.env
├── .gitignore
├── README.md
├── app
|    ├── (docs-page)
|    |    ├── components
|    |    ├── get-started
|    ├── live-components
|    ├── globals.css
├── assets
|    ├── preview
|    |    ├── buttons.svg
|    |    ├── motion-number.svg
├── components
|    ├── core
|    ├── website
|    ├── ui
├── hooks
|    ├── use-media-query.tsx
├── lib
|    ├── utils.ts
├── public
├── registry
├── tailwind.config.ts
├── tsconfig.json
```

> **Note:** This is a simplified version of the folder structure. The full structure is available in the repository.

---

## 🛠️ **Installation & Setup**

To get started with UI-LAYOUT, follow these steps:

### 📌 **1. Clone the Repository**
```bash
$ git clone https://github.com/your-username/ui-layout.git
$ cd ui-layout
```

### 📌 **2. Install Dependencies**
```bash
$ npm install
```

### 📌 **3. Start the Development Server**
```bash
$ npm run dev
```

---

## 🎨 **Utilities & Custom Hooks**

### ✨ Utility Function for Class Merging
```tsx
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 📏 **useMediaQuery Hook**
```tsx
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

---

## 📷 Screenshots

![Preview](image.png)  

---

## 👨‍💻 **Author - Naymur**

🔹 **X:** [@naymur_dev](https://x.com/naymur_dev)  
🔹 **LinkedIn:** [in/naymur-rahman](https://www.linkedin.com/in/naymur-rahman/)  

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to modify and distribute! 🚀

---

💡 **Enjoy building with UI-LAYOUT! Happy Coding!** 🎨🔥

