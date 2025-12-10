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
                – 100+ Tailwind & React components for production-ready UIs
              </span>
              <span className='lg:hidden sm:inline-block hidden'>
                – 50+ battle-tested components.
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
          <Link href='/' className='hidden lg:block'>
            <div className='relative hidden gap-2 lg:flex pl-2'>
              <svg
                width='246'
                height='81'
                viewBox='0 0 246 81'
                fill='none'
                className='h-full w-36 fill-primary stroke-primary '
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M29.096 48.704V50.688C29.096 50.7733 29.096 50.8587 29.096 50.944C29.224 51.6267 29.6293 51.968 30.312 51.968H52.136V63.936H22.312C21.3307 63.936 20.4773 63.5733 19.752 62.848C19.0267 62.1227 18.664 61.2693 18.664 60.288V34.688C18.664 33.664 19.0267 32.8107 19.752 32.128C20.4773 31.4027 21.3307 31.04 22.312 31.04H26.216C27.24 31.04 28.1147 30.6773 28.84 29.952C29.5653 29.2267 29.928 28.352 29.928 27.328V22.848C29.928 21.824 30.2693 20.9493 30.952 20.224C31.6773 19.4987 32.552 19.136 33.576 19.136H52.136V31.04H30.312C29.6293 31.04 29.224 31.3813 29.096 32.064C29.096 32.1493 29.096 32.2133 29.096 32.256V48.704ZM76.363 35.648H87.435V60.864C87.435 61.7173 87.115 62.464 86.475 63.104C85.8777 63.7013 85.1523 64 84.299 64H68.875C67.851 64 66.9763 63.6373 66.251 62.912C65.5257 62.1867 65.163 61.3333 65.163 60.352V57.152C65.163 56.256 64.9497 55.424 64.523 54.656C64.0963 53.888 63.499 53.2907 62.731 52.864C62.0057 52.3947 61.195 52.1387 60.299 52.096H57.611C56.6297 52.096 55.7763 51.7547 55.051 51.072C54.3257 50.3467 53.963 49.472 53.963 48.448V35.648H65.227V50.944C65.227 51.2427 65.3123 51.4987 65.483 51.712C65.6963 51.9253 65.9523 52.032 66.251 52.032H75.275C75.5737 52.032 75.8297 51.9253 76.043 51.712C76.2563 51.4987 76.363 51.2427 76.363 50.944V35.648ZM105.689 35.648H117.849V47.68H102.937C102.638 47.68 102.382 47.7867 102.169 48C101.956 48.1707 101.849 48.4053 101.849 48.704V64H90.777V51.2C90.777 50.176 91.1397 49.3227 91.865 48.64C92.5903 47.9147 93.4437 47.552 94.425 47.552H98.265C99.289 47.552 100.164 47.1893 100.889 46.464C101.614 45.7387 101.977 44.8427 101.977 43.776V39.36C101.977 38.6773 102.148 38.0587 102.489 37.504C102.83 36.9493 103.278 36.5013 103.833 36.16C104.388 35.8187 105.006 35.648 105.689 35.648ZM154.208 35.712V45.568H134.496L151.712 51.52C152.437 51.776 153.034 52.224 153.504 52.864C153.973 53.504 154.208 54.208 154.208 54.976V64H120.736V52.096H135.072L123.296 48.384C122.528 48.1707 121.909 47.744 121.44 47.104C120.97 46.4213 120.736 45.696 120.736 44.928V35.712H154.208ZM169.437 31.168H158.365V19.2H169.437V31.168ZM158.365 64V35.712H169.437V64H158.365ZM186.088 31.168C185.874 31.168 185.682 31.232 185.512 31.36C185.341 31.4453 185.213 31.5733 185.128 31.744C185.042 31.9147 185 32.0853 185 32.256V35.648H194.28C194.578 35.648 194.834 35.7547 195.048 35.968C195.261 36.1813 195.368 36.4373 195.368 36.736V46.464C195.368 46.7627 195.261 47.0187 195.048 47.232C194.834 47.4453 194.578 47.552 194.28 47.552H185V58.048V64H173.928V34.752C173.928 33.728 174.29 32.8747 175.016 32.192C175.741 31.4667 176.594 31.104 177.576 31.104H181.416C182.44 31.104 183.314 30.7413 184.04 30.016C184.765 29.248 185.128 28.352 185.128 27.328V22.848C185.128 21.8667 185.49 21.0133 186.216 20.288C186.941 19.5627 187.816 19.2 188.84 19.2H198.376V31.168H186.088ZM219.676 35.648H230.748V64.896C230.748 65.92 230.385 66.7947 229.66 67.52C228.934 68.2453 228.06 68.608 227.036 68.608H223.26C222.236 68.608 221.34 68.9707 220.572 69.696C219.846 70.4213 219.484 71.296 219.484 72.32V76.8C219.484 77.824 219.121 78.6773 218.396 79.36C217.713 80.0853 216.86 80.448 215.836 80.448H197.276V68.48H218.588C218.886 68.48 219.142 68.3733 219.356 68.16C219.569 67.9467 219.676 67.6907 219.676 67.392V65.088V64H212.188C211.164 64 210.289 63.6373 209.564 62.912C208.838 62.1867 208.476 61.3333 208.476 60.352V57.152C208.476 56.256 208.262 55.424 207.836 54.656C207.409 53.888 206.812 53.2907 206.044 52.864C205.318 52.3947 204.508 52.1387 203.612 52.096H200.924C199.942 52.096 199.089 51.7547 198.364 51.072C197.638 50.3467 197.276 49.472 197.276 48.448V35.648H208.54V50.944C208.54 51.2427 208.625 51.4987 208.796 51.712C209.009 51.9253 209.265 52.032 209.564 52.032H218.588C218.886 52.032 219.142 51.9253 219.356 51.712C219.569 51.4987 219.676 51.2427 219.676 50.944V35.648Z' />
                <path
                  d='M18.6055 27.2686L2 24.6406'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
                <path
                  d='M21.9606 22.5695L8.89062 10.5107'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
                <path
                  d='M26.8882 17.6789L20.0938 1.70215'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
                <path
                  d='M245.245 7.89666L235.068 33.4694C234.724 34.3342 233.489 34.301 233.192 33.4189L231.612 28.732L230.773 26.2418C230.573 25.6477 229.882 25.3822 229.336 25.6893L222.429 29.5714L221.571 29.1429L220.714 28.2857L225.319 20.6779C225.618 20.1828 225.436 19.5375 224.922 19.2718L222.582 18.0619L218.23 15.8126C217.427 15.3975 217.543 14.2143 218.412 13.9635L244.039 6.56614C244.838 6.33552 245.553 7.12404 245.245 7.89666Z'
                  stroke='black'
                />
              </svg>
            </div>
          </Link>

          {/* <MobileHeader /> */}
          <MobileHeader classname='lg:hidden block' />

          <div className='flex gap-2 '>
            {pathname === '/' && (
              <a
                href='https://ui-layouts.com/'
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
