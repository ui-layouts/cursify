/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

function Footer({ className }: { className?: string }) {
  return (
    <>
      <footer
        className={cn(
          'relative border mb-5 not-prose rounded-xl gap-10 sm:flex justify-between p-4  dark:bg-black/40 bg-primary-foreground backdrop-blur-sm    text-primary',
          className
        )}
      >
        <div className='w-fit   flex  justify-center'>
          <a href='https://github.com/ui-layouts' target='_blank'>
            <svg
              width='280'
              height='313'
              viewBox='0 0 280 313'
              className='w-20 h-20 fill-primary'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g filter='url(#filter0_ddd_3823_26)'>
                <path d='M186.104 80.3764L273.097 110.122C274.311 110.537 275.127 111.678 275.127 112.96V279.732C275.127 285.462 272.554 290.475 267.408 294.772C262.605 298.782 256.773 300.788 249.912 300.788H125.898C117.664 300.788 110.632 298.353 104.8 293.483C98.9679 288.613 96.052 282.884 96.052 276.295V254.81C96.052 248.794 94.3367 243.208 90.9061 238.052C87.4756 232.895 82.6728 228.885 76.4978 226.02C70.6659 222.869 64.1479 221.15 56.9437 220.864H35.3312C27.4409 220.864 20.5798 218.572 14.7479 213.989C8.91597 209.119 6 203.246 6 196.371V37.5571C6 31.71 10.2143 26.7141 15.9778 25.7287L97.0282 11.8721L96.5666 213.129C96.5666 215.134 97.2527 216.853 98.6249 218.285C100.34 219.718 102.398 220.434 104.8 220.434H177.356C179.757 220.434 181.816 219.718 183.531 218.285C185.246 216.853 186.104 215.134 186.104 213.129V80.3764Z' />
                <path d='M95.0289 183.237L6.00607 181.889V20.5009C6.00607 14.9224 8.57898 10.0412 13.7248 5.85727C18.5276 1.9523 24.3595 -0.000213623 31.2206 -0.000213623H155.235C163.468 -0.000213623 170.501 2.3707 176.333 7.11243C182.165 11.8542 185.081 17.4327 185.081 23.848L185.081 44.7675C185.081 50.625 186.796 56.0641 190.227 61.0848C193.657 66.1055 198.46 70.0105 204.635 72.7997C210.467 75.8679 216.985 77.5415 224.189 77.8204L245.802 77.8204C253.692 77.8204 260.553 80.0518 266.385 84.5146C272.217 89.2564 275.133 94.9744 275.133 101.669L275.133 276.873C275.133 285.71 267.969 292.873 259.133 292.873H184.566L184.566 85.3514C184.566 83.3989 183.88 81.7254 182.508 80.3307C180.793 78.9361 178.734 78.2388 176.333 78.2388L103.777 78.2388C101.375 78.2388 99.317 78.9361 97.6018 80.3307C95.8865 81.7254 95.0289 83.3989 95.0289 85.3514L95.0289 183.237Z' />
              </g>
            </svg>
          </a>
        </div>
        <article className='py-2  w-fit space-y-2  '>
          <a
            href='https://x.com/bachhav36741'
            target='_blank'
            className='flex gap-2 items-center'
          >
            <img
              src='/bob.gif'
              className='w-8 h-8 border rounded-sm'
              alt='bob'
            />
            Created By <span className='underline'>Durgesh</span>
          </a>
          <a
            href='https://x.com/naymur_dev'
            target='_blank'
            className='flex gap-2 items-center'
          >
            <img
              src='/bob2.gif'
              alt='bob2'
              className='w-8 h-8 border rounded-sm'
            />
            Re-imagined By <span className='underline'>Naymur</span>
          </a>
        </article>
        {/* <div className='sm:block flex sm:mt-0 mt-4  gap-2 sm:w-auto w-full sm:space-y-2 relative z-[1]'>
          <a
            href='https://www.linkedin.com/in/naymur-rahman/'
            target='_blank'
            className='bg-gray-50 sm:w-auto w-full   grid place-content-center p-4 rounded-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='70'
              height='62'
              viewBox='0 0 70 62'
              fill='none'
              className='sm:w-24 w-full  text-blue-500'
            >
              <path
                d='M55.1291 0H65.8629L42.4127 26.2626L70 62H48.3994L31.481 40.3254L12.1226 62H1.38228L26.4646 33.9092L0 0H22.149L37.4417 19.8114L55.1291 0ZM51.3619 55.7046H57.3096L18.9172 5.96472H12.5347L51.3619 55.7046Z'
                fill='currentColor'
              ></path>
            </svg>
          </a>

          <a
            href='https://x.com/naymur_dev'
            target='_blank'
            className='bg-gray-50 sm:w-auto w-full  grid place-content-center  p-4 rounded-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              viewBox='0 0 80 78'
              fill='none'
              className='sm:w-24 w-full text-blue-500'
            >
              <path
                d='M16.6 8.79036C16.6 13.3937 12.9 17.1237 8.33333 17.1237C3.76667 17.1237 0.0666667 13.3937 0.0666667 8.79036C0.0666667 4.19036 3.76667 0.457031 8.33333 0.457031C12.9 0.457031 16.6 4.19036 16.6 8.79036ZM16.6667 23.7904H0V77.1237H16.6667V23.7904ZM43.2733 23.7904H26.7133V77.1237H43.2767V49.127C43.2767 33.5604 63.3733 32.287 63.3733 49.127V77.1237H80V43.3537C80 17.087 50.26 18.0437 43.2733 30.9737V23.7904Z'
                fill='currentColor'
              ></path>
            </svg>
          </a>
        </div> */}
      </footer>
    </>
  );
}

export default Footer;
