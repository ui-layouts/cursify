import Link from 'next/link';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { AllComponens } from '@/configs/docs';

export function ComponentPagination({ doc }: any) {
  const pager = findPrevNextComp(AllComponens, doc.slug);
  console.log('pager', pager);
  // console.log(sidebarData, doc.slug);

  return (
    <div className='flex flex-row items-center justify-between mt-5 mb-4'>
      {pager?.previous?.id && (
        <Link
          href={pager.previous.id}
          className='group relative inline-flex no-underline h-12 items-center justify-center overflow-hidden rounded-md dark:bg-primary-foreground bg-gray-100   border px-3 font-medium dark:text-white text-black transition-all duration-200 hover:translate-x-[3px] translate-x-[0px] hover:translate-y-[-3px] translate-y-[0px] hover:[box-shadow:5px_5px_rgb(28_39_56)] dark:hover:[box-shadow:-5px_5px_rgb(229_231_235)]'
        >
          <ChevronsLeft className='mr-1 h-4 w-4' />
          {pager.previous.componentName}
        </Link>
      )}
      {pager?.next?.id && (
        <Link
          href={pager.next.id}
          className='group relative inline-flex h-12 no-underline items-center justify-center overflow-hidden rounded-md dark:bg-primary-foreground bg-gray-100   border px-3 font-medium dark:text-white text-black transition-all duration-200 hover:translate-x-[-3px] translate-x-[0px] hover:translate-y-[-3px] translate-y-[0px] hover:[box-shadow:5px_5px_rgb(28_39_56)] dark:hover:[box-shadow:5px_5px_rgb(229_231_235)] '
        >
          {pager.next.componentName}
          <ChevronsRight className='ml-1 h-4 w-4' />
        </Link>
      )}
    </div>
  );
}
export const findPrevNextComp = (dataArray: any[], slug: string) => {
  // Find the index of the component that matches the slug
  const index = dataArray.findIndex((component) => component.id === slug);

  if (index === -1) {
    return { previous: null, next: null }; // Return null if no match is found
  }

  const previous = index > 0 ? dataArray[index - 1] : null;
  const next = index < dataArray.length - 1 ? dataArray[index + 1] : null;
  // console.log(previous, next);

  return { previous, next };
};
