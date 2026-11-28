'use client';

import Link from 'next/link';
import { Select } from '@base-ui/react/select';
import * as Dialog from '@radix-ui/react-dialog';
import { NavigationIcon, PanelIcon } from './panel-icons';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { NPM, Pnpm, Yarn, Bun } from './package-manager-icons';
import ArrowUpDownIcon from '@hugeicons/core-free-icons/ArrowUpDownIcon';
import Copy01Icon from '@hugeicons/core-free-icons/Copy01Icon';
import Tick02Icon from '@hugeicons/core-free-icons/Tick02Icon';
import ArrowLeft01Icon from '@hugeicons/core-free-icons/ArrowLeft01Icon';
import ArrowRight01Icon from '@hugeicons/core-free-icons/ArrowRight01Icon';
import ArrowExpandIcon from '@hugeicons/core-free-icons/ArrowExpandIcon';
import FolderCodeIcon from '@hugeicons/core-free-icons/FolderCodeIcon';
import GitHubButton from '../github-btn';
import { AllComponens } from '@/configs/docs';
import { CursifyWordmark } from '../cursify-wordmark';
import CubeIcon from '@hugeicons/core-free-icons/CubeIcon';
import BookOpen01Icon from '@hugeicons/core-free-icons/BookOpen01Icon';
import { SearchDialog } from '../searchbar';
import styles from './showcase.module.css';
import bar from './toolbar.module.css';

const managerIcons = { npm: NPM, pnpm: Pnpm, yarn: Yarn, bun: Bun };
const commands = {
  npm: 'npx',
  pnpm: 'pnpm dlx',
  yarn: 'yarn dlx',
  bun: 'bunx',
};
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [manager, setManager] = useState<keyof typeof commands>('npm');
  const notes = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(true);
  const ManagerIcon = managerIcons[manager];
  const [width, setWidth] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const index = AllComponens.findIndex((item) => item.id === slug);
  const live = '/live-example/' + slug;
  const github = repository + '/blob/main/' + filePath;

  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    function revealHash() {
      const target = document.getElementById(location.hash.slice(1));
      if (target && notes.current?.contains(target)) setOpen(true);
    }
    window.addEventListener('hashchange', revealHash);
    return () => window.removeEventListener('hashchange', revealHash);
  }, []);

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
          ? `${commands[manager]} shadcn@latest add ${window.location.origin}/r/${slug}.json`
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
            event.currentTarget.scrollTop > 0
          ) {
            event.currentTarget.scrollTop = 0;
            setOpen(true);
          }
        }}
      >
        <section className={styles.stage} aria-label={title + ' preview'}>
          <iframe
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
          <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Dialog.Trigger asChild>
              <button
                className={bar.launcher}
                aria-label='Open component navigation'
              >
                <span>
                  <NavigationIcon open={drawerOpen} />
                </span>
              </button>
            </Dialog.Trigger>
            <Link className={bar.wordmark} href='/' aria-label='Cursify home'>
              <CursifyWordmark className='h-full w-full fill-primary stroke-primary' />
            </Link>
            <Dialog.Portal>
              <Dialog.Overlay className={bar.overlay} />
              <Dialog.Content
                className={bar.drawer}
                aria-describedby={undefined}
              >
                <header className={bar.drawerHeader}>
                  <Dialog.Title>
                    <Link
                      href='/'
                      className={bar.drawerBrand}
                      aria-label='Cursify home'
                    >
                      <CursifyWordmark className='fill-primary stroke-primary' />
                    </Link>
                    <span className='sr-only'>Browse components</span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button aria-label='Close component navigation'>
                      <NavigationIcon open />
                    </button>
                  </Dialog.Close>
                </header>
                <nav
                  aria-label='Browse Cursify'
                  className={bar.drawerLinks}
                  onClick={(e) => {
                    if ((e.target as Element).closest('a'))
                      setDrawerOpen(false);
                  }}
                >
                  <Link href='/get-started'>
                    <HugeiconsIcon icon={BookOpen01Icon} />
                    Get Started
                  </Link>
                  <Link href='/components'>
                    <HugeiconsIcon icon={CubeIcon} />
                    Components
                  </Link>
                  {['Cursor Effects', 'Patterns'].map((group) => (
                    <section key={group}>
                      <h2>{group}</h2>
                      {AllComponens.filter(
                        (item) =>
                          (item.type === 'pattern') === (group === 'Patterns'),
                      ).map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          aria-current={item.id === slug ? 'page' : undefined}
                        >
                          {item.componentName}
                        </Link>
                      ))}
                    </section>
                  ))}
                </nav>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
          <div className={bar.github}>
            <GitHubButton iconOnly className={bar.liquidGithub} />
            <a
              className={bar.pro}
              href='https://pro.ui-layouts.com'
              aria-label='UI Layouts Pro'
            >
              Pro<sup>+</sup>
            </a>
          </div>
          <nav
            className={`${bar.group} ${bar.pager}`}
            aria-label='Component navigation'
          >
            <button
              ref={toggle}
              aria-label='Documentation view'
              aria-controls='component-details'
              aria-pressed={open}
              onClick={() => setOpen(value => !value)}
            >
              <PanelIcon open={open} />
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
          <div className={`${bar.group} ${bar.center}`}>
            <SearchDialog classname={bar.search} />
            <div className={bar.install}>
              <Select.Root
                value={manager}
                onValueChange={(value) => {
                  if (value) setManager(value);
                }}
              >
                <Select.Trigger
                  className={bar.manager}
                  aria-label={'Package manager: ' + manager}
                >
                  <ManagerIcon aria-hidden />
                  <HugeiconsIcon icon={ArrowUpDownIcon} size={12} />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner
                    className={bar.managerPositioner}
                    side='top'
                    align='start'
                    sideOffset={8}
                    alignItemWithTrigger={false}
                  >
                    <Select.Popup className={bar.managerPopup}>
                      <Select.List>
                        {(
                          Object.keys(commands) as (keyof typeof commands)[]
                        ).map((id) => {
                          const Icon = managerIcons[id];
                          return (
                            <Select.Item
                              key={id}
                              value={id}
                              className={bar.managerOption}
                            >
                              <Icon aria-hidden />
                              <Select.ItemText>{id}</Select.ItemText>
                              <Select.ItemIndicator
                                className={bar.managerCheck}
                              >
                                <HugeiconsIcon icon={Tick02Icon} size={14} />
                              </Select.ItemIndicator>
                            </Select.Item>
                          );
                        })}
                      </Select.List>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
              <button
                onClick={() => copy('cli')}
                aria-label='Copy CLI command'
                title='Copy install command'
              >
                <span>@cursify/{slug}</span>
                <HugeiconsIcon
                  icon={copied === 'cli' ? Tick02Icon : Copy01Icon}
                />
              </button>
            </div>
            <output aria-label='Reading progress'>
              {open ? progress : 0}%
            </output>
          </div>
          <div className={`${bar.group} ${bar.actions}`}>
            <button onClick={() => copy('prompt')} aria-label='Copy prompt'>
              <span>Copy Prompt</span>
              <HugeiconsIcon
                icon={copied === 'prompt' ? Tick02Icon : Copy01Icon}
              />
            </button>
            <a
              href={github}
              target='_blank'
              rel='noreferrer'
              aria-label='View source on GitHub'
            >
              <HugeiconsIcon icon={FolderCodeIcon} />
            </a>
            <a
              href={live}
              target='_blank'
              rel='noreferrer'
              aria-label='Expand preview'
            >
              <HugeiconsIcon icon={ArrowExpandIcon} />
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
      </div>
    </main>
  );
}
