'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { AllComponens } from '@/configs/docs';
import { Spotlight, SpotLightItem } from '@/components/website/ui/spotlight';
import { ArrowRight } from 'lucide-react';
import Footer from '@/components/website/footer';
import CanvasCursor from '@/registry/components/cursor/common/canvas-cursor';

export default function Home() {
  return (
    <>
      <CanvasCursor />
      <div className='pt-[5.4rem] pb-5'>
        <h1
          className={'sm:text-3xl text-2xl font-semibold tracking-tight pb-1'}
        >
          Components
        </h1>

        <p className='md:text-lg text-sm text-muted-foreground lg:w-[80%]'>
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <>
          <Spotlight className=' grid md:grid-cols-3 grid-cols-2 gap-4 py-2'>
            {AllComponens.map((component, index) => (
              <SpotLightItem key={index}>
                <>
                  <Link
                    href={component.href}
                    className='p-2 pl-5 dark:bg-[#01040e] backdrop-blur-sm bg-gray-50 transition-all rounded-md dark:border-none border  relative flex justify-between items-center'
                  >
                    <div>
                      <h1 className='font-medium text-xl'>
                        {component.componentName}
                      </h1>
                    </div>
                    <button className='h-full dark:bg-gray-900 bg-gray-100 border p-3 rounded-md'>
                      <ArrowRight />
                    </button>
                  </Link>
                </>
              </SpotLightItem>
            ))}
          </Spotlight>
        </>
      </div>
      <Footer />
    </>
  );
}
