'use client';
import { useTheme } from 'next-themes';
import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Github } from 'lucide-react';
import { SearchDialog } from './searchbar';
import ThemeSwitch from './theme-switch';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/website/ui/dropdown';
import GitHubButton from './github-btn';
import { CursifyWordmark } from './cursify-wordmark';
import MobileHeader from './moibile-header';
import { Banner } from './ui/banner';
function Header() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <>
      {pathname === '/' && (
        <a
          href={'https://pro.ui-layouts.com'}
          target='_blank'
          className='block group w-full relative'
        >
          <Banner
            variant='rainbow'
            className='h-11 md:text-base sm:text-sm text-xs'
          >
            <p className='group-hover:underline underline-offset-4 flex flex-wrap gap-1 items-center'>
              <picture>
                <source
                  srcSet='https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.webp'
                  type='image/webp'
                />
                <img
                  src='https://fonts.gstatic.com/s/e/notoemoji/latest/1f680/512.gif'
                  alt='🚀'
                  className='w-6 h-6'
                  width='32'
                  height='32'
                />
              </picture>
              Ship faster with{' '}
              <span className='font-semibold'>UI-Layouts Pro</span>
              <span className='lg:inline-block hidden'>
                – 100+ Tailwind & React Blocks & Templates for production-ready
                UIs
              </span>
            </p>
            <ArrowUpRight
              className='size-5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 ease-out shrink-0'
              strokeWidth={2}
            />
          </Banner>
        </a>
      )}
      <header
        className={`sticky left-0 top-0 z-50 xl:px-0 px-1.5 w-full ${pathname === '/' ? '' : 'pt-2 dark:bg-zinc-950 bg-zinc-50'}`}
      >
        {/* {pathname === '/' && (
          <div className='bg-primary  max-w-screen-xl mx-auto w-full text-background text-center text-base p-1 font-medium '>
            Explore Components that are really needed for your website,{' '}
            <a
              href='https://www.ui-layouts.com/'
              className='underline'
              target='_blank'
            >
              Ui-layouts
            </a>
          </div>
        )} */}

        <div
          className={` ${pathname === '/' ? 'rounded-b-lg max-w-screen-xl' : 'rounded-lg  xl:container'}  border border-x   border-border dark:bg-black/40 bg-primary-foreground  backdrop-blur-md mx-auto flex items-center justify-between gap-2 px-2 py-2  `}
        >
          <Link href='/' aria-label='Cursify home' className='hidden lg:block'>
            <div className='relative hidden gap-2 lg:flex pl-2'>
              <CursifyWordmark className='h-full w-36 fill-primary stroke-primary' />
            </div>
          </Link>

          {/* <MobileHeader /> */}
          <MobileHeader classname='lg:hidden block' />

          <div className='flex gap-2 '>
            {pathname === '/' && (
              <a
                href='https://www.ui-layouts.com/'
                target='_blank'
                className='p-2.5 text-white bg-gradient-to-t from-zinc-900 to-neutral-950 md:inline-block hidden font-semibold uppercase rounded-lg px-3 border dark:border-0 dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]'
              >
                Ui-Layouts{' '}
              </a>
            )}
            {pathname === '/' && (
              <a
                href='https://tools.ui-layouts.com/'
                target='_blank'
                className='p-2.5 text-white bg-gradient-to-t from-blue-500 to-blue-800  md:inline-block hidden font-semibold uppercase rounded-lg px-3 border dark:border-0 dark:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]'
              >
                Tools{' '}
                <span className='text-xs font-normal inline-block -translate-y-2 text-blue-200 '>
                  New
                </span>
              </a>
            )}

            <SearchDialog classname='sm:w-32 xl:w-72' />

            <GitHubButton />
            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* <a
                  target='_blank'
                  href='https://x.com/uilayout'
                  className='border flex-shrink-0 bg-primary  text-primary-foreground text-2xl w-12   grid  place-content-center    rounded-md'
                > */}
                <div className='border flex-shrink-0 bg-primary  text-primary-foreground text-2xl w-12  h-11  grid  place-content-center    rounded-md'>
                  <svg
                    width='120'
                    height='109'
                    viewBox='0 0 120 109'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className=' fill-primary-foreground w-6 h-5'
                  >
                    <path d='M94.5068 0H112.907L72.7076 46.172L120 109H82.9692L53.9674 70.8942L20.7818 109H2.3693L45.3666 59.6147L0 0H37.9685L64.1848 34.8292L94.5068 0ZM88.0484 97.9318H98.2448L32.4288 10.4872H21.4882L88.0484 97.9318Z' />
                  </svg>
                </div>
                {/* </a> */}
              </DropdownMenuTrigger>
              <DropdownMenuContent className='w-44 mt-3 dark:bg-black/40 bg-primary-foreground  backdrop-blur-xl  py-1'>
                <DropdownMenuItem className='group'>
                  <a
                    target='_blank'
                    href='https://x.com/bachhav36741'
                    className='flex  items-center  rounded-md justify-between w-full'
                  >
                    Durgesh{' '}
                    <ArrowUpRight
                      className='group-focus:opacity-100 opacity-0'
                      size={16}
                    />
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className='group'>
                  <a
                    target='_blank'
                    href='https://x.com/naymur_dev'
                    className='flex items-center   rounded-md justify-between w-full'
                  >
                    Naymur{' '}
                    <ArrowUpRight
                      className='group-focus:opacity-100 opacity-0'
                      size={16}
                    />
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className='group'>
                  <a
                    target='_blank'
                    href='https://x.com/uilayout'
                    className='flex  items-center  rounded-md justify-between w-full'
                  >
                    Ui-Layouts{' '}
                    <ArrowUpRight
                      className='group-focus:opacity-100 opacity-0'
                      size={16}
                    />
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeSwitch className='bg-background border w-12 rounded-md h-11 flex-shrink-0' />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
