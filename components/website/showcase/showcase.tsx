'use client';

import Link from 'next/link';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import CommandLineIcon from '@hugeicons/core-free-icons/CommandLineIcon';
import Maximize01Icon from '@hugeicons/core-free-icons/Maximize01Icon';
import SourceCodeIcon from '@hugeicons/core-free-icons/SourceCodeIcon';
import GithubIcon from '@hugeicons/core-free-icons/GithubIcon';
import SidebarLeft01Icon from '@hugeicons/core-free-icons/SidebarLeft01Icon';
import LayoutLeftIcon from '@hugeicons/core-free-icons/LayoutLeftIcon';
import RefreshIcon from '@hugeicons/core-free-icons/RefreshIcon';
import AiMagicIcon from '@hugeicons/core-free-icons/AiMagicIcon';
import { AllComponens } from '@/configs/docs';
import { CursifyWordmark } from '../cursify-wordmark';
import { ComponentNavigation } from '../component-navigation';
import { SearchDialog } from '../searchbar';
import styles from './showcase.module.css';
import bar from './toolbar.module.css';

const desktop = '(min-width: 900px)';
const repository = 'https://github.com/ui-layouts/cursify';

export function Showcase({
  slug,
  title,
  source,
  filePath,
  children,
}: {
  slug: string;
  title: string;
  source: string;
  filePath: string;
  children: ReactNode;
}) {
  const layout = useRef<HTMLDivElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const notes = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generation, setGeneration] = useState(0);
  const [copied, setCopied] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const index = AllComponens.findIndex((item) => item.id === slug);
  const live = '/live-example/' + slug;
  const github = repository + '/blob/main/' + filePath;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    const media = matchMedia(desktop);
    function sync() {
      if (media.matches) {
        if (
          location.hash &&
          document.getElementById(decodeURI(location.hash.slice(1)))
        )
          setOpen(true);
      } else {
        setOpen((notes.current?.getBoundingClientRect().top ?? Infinity) <= 72);
        setProgress(
          Math.round(
            (100 * window.scrollY) /
              Math.max(1, document.documentElement.scrollHeight - innerHeight),
          ),
        );
      }
    }
    sync();
    media.addEventListener('change', sync);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('hashchange', sync);
    return () => {
      media.removeEventListener('change', sync);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  function toggleDocs() {
    if (!matchMedia(desktop).matches) {
      if (open) window.scrollTo({ top: 0 });
      else notes.current?.scrollIntoView();
    }
    setOpen(!open);
  }
  function resize(value: number) {
    if (value <= 25) {
      setOpen(false);
      setDragging(false);
      setWidth(50);
      toggle.current?.focus();
    } else setWidth(Math.min(70, value));
  }
  async function copy(action: 'cli' | 'prompt') {
    try {
      await navigator.clipboard.writeText(
        action === 'cli'
          ? `npx shadcn@latest add ${window.location.origin}/r/${slug}.json`
          : `Implement the Cursify ${title} effect in my project. Adapt this React component to the existing layout and preserve its pointer behavior.\n\n${github}\n\n${source}`,
      );
      setCopied(action);
    } catch {
      setCopied('error');
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(''), 2000);
  }
  return (
    <main className={styles.page}>
      <a
        href='#component-details'
        className={styles.skip}
        onClick={() => setOpen(true)}
      >
        Skip to documentation
      </a>
      <div
        ref={layout}
        className={styles.split}
        data-open={open}
        data-resizing={dragging}
        style={{ '--docs-width': width + '%' } as CSSProperties}
        onScroll={(event) => {
          if (
            !open &&
            event.currentTarget.scrollTop > 0 &&
            matchMedia(desktop).matches
          ) {
            event.currentTarget.scrollTop = 0;
            setOpen(true);
          }
        }}
      >
        <section className={styles.stage} aria-label={title + ' preview'}>
          <iframe
            key={generation}
            className={styles.frame}
            src={live}
            title={title + ' interactive preview'}
            scrolling='no'
          />
          <div
            hidden={!open}
            role='separator'
            aria-orientation='vertical'
            aria-label='Documentation width'
            aria-controls='component-details'
            aria-valuemin={25}
            aria-valuemax={70}
            aria-valuenow={width}
            tabIndex={0}
            className={styles.divider}
            onPointerDown={(e) => {
              if (e.button === 0) {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragging(true);
              }
            }}
            onLostPointerCapture={() => setDragging(false)}
            onPointerMove={(e) => {
              if (
                !e.currentTarget.hasPointerCapture(e.pointerId) ||
                !layout.current
              )
                return;
              const rect = layout.current.getBoundingClientRect();
              resize((100 * (e.clientX - rect.left)) / rect.width);
            }}
            onKeyDown={(e) => {
              const values: Record<string, number> = {
                ArrowLeft: width - 5,
                ArrowRight: width + 5,
                Home: 25,
                End: 70,
              };
              if (e.key in values) {
                e.preventDefault();
                resize(values[e.key]);
              }
            }}
          />
        </section>
        <div
          ref={notes}
          className={styles.notes}
          onScroll={(e) => {
            const el = e.currentTarget;
            setProgress(
              Math.round(
                (100 * el.scrollTop) /
                  Math.max(1, el.scrollHeight - el.clientHeight),
              ),
            );
          }}
        >
          {children}
        </div>
        <div className={bar.toolbar} data-open={open}>
          <span className={bar.topBlur} aria-hidden />
          <button
            className={bar.launcher}
            ref={toggle}
            aria-label='Documentation view'
            aria-controls='component-details'
            aria-pressed={open}
            onClick={toggleDocs}
          >
            <HugeiconsIcon icon={LayoutLeftIcon} />
          </button>
          <Link className={bar.wordmark} href='/' aria-label='Cursify home'>
            <CursifyWordmark className='h-full w-full fill-primary stroke-primary' />
          </Link>
          <div className={bar.github}>
            <a href={repository} aria-label='Cursify on GitHub'>
              <HugeiconsIcon icon={GithubIcon} />
            </a>
            <a
              className={bar.pro}
              href='https://pro.ui-layouts.com'
              aria-label='UI Layouts Pro'
            >
              Pro<sup>+</sup>
            </a>
          </div>
          <nav className={bar.group} aria-label='Component navigation'>
            <button
              aria-label='Browse components'
              onClick={() => drawer.current?.showModal()}
            >
              <HugeiconsIcon icon={SidebarLeft01Icon} />
            </button>
            {[-1, 1].map((step) => {
              const item = AllComponens[index + step];
              const direction = step < 0 ? 'Previous' : 'Next';
              const icon =
                step < 0 ? (
                  <HugeiconsIcon icon={ArrowLeft01Icon} />
                ) : (
                  <HugeiconsIcon icon={ArrowRight01Icon} />
                );
              return item ? (
                <Link
                  key={step}
                  href={item.href}
                  aria-label={direction + ' component: ' + item.componentName}
                >
                  {icon}
                </Link>
              ) : (
                <button
                  key={step}
                  disabled
                  aria-label={direction + ' component'}
                >
                  {icon}
                </button>
              );
            })}
          </nav>
          <div className={bar.group}>
            <SearchDialog classname={bar.search} />
            <button onClick={() => copy('cli')} aria-label='Copy CLI command'>
              {copied === 'cli' ? (
                <HugeiconsIcon icon={Tick02Icon} />
              ) : (
                <HugeiconsIcon icon={CommandLineIcon} />
              )}
              <span>Copy CLI</span>
            </button>
            <output aria-label='Reading progress'>
              {open ? progress : 0}%
            </output>
          </div>
          <div className={bar.group}>
            <button onClick={() => copy('prompt')} aria-label='Copy prompt'>
              {copied === 'prompt' ? (
                <HugeiconsIcon icon={Tick02Icon} />
              ) : (
                <HugeiconsIcon icon={AiMagicIcon} />
              )}
              <span>Copy Prompt</span>
            </button>
            <button
              aria-label='Restart preview'
              onClick={() => setGeneration((value) => value + 1)}
            >
              <HugeiconsIcon icon={RefreshIcon} />
            </button>
            <a
              href={github}
              target='_blank'
              rel='noreferrer'
              aria-label='View source on GitHub'
            >
              <HugeiconsIcon icon={SourceCodeIcon} />
            </a>
            <a
              href={live}
              target='_blank'
              rel='noreferrer'
              aria-label='Expand preview'
            >
              <HugeiconsIcon icon={Maximize01Icon} />
            </a>
          </div>
          <span
            className={copied === 'error' ? bar.error : 'sr-only'}
            role='status'
          >
            {copied === 'error'
              ? 'Could not copy to clipboard.'
              : copied
                ? 'Copied to clipboard.'
                : ''}
          </span>
        </div>
        <dialog
          ref={drawer}
          className={bar.drawer}
          aria-label='Browse components'
          onClick={(e) => {
            if (e.target === drawer.current) drawer.current.close();
          }}
        >
          <div>
            <form method='dialog'>
              <button aria-label='Close navigation'>Close</button>
            </form>
            <Link href='/components'>Component gallery</Link>
            <ComponentNavigation
              pathname={'/components/' + slug}
              headingId='drawer-components'
              headingClassName='mt-5 mb-2 font-semibold'
              onVisit={() => drawer.current?.close()}
            />
          </div>
        </dialog>
      </div>
    </main>
  );
}
