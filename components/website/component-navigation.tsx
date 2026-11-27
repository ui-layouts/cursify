import Link from 'next/link';
import { AllComponens } from '@/configs/docs';

type Props = {
  headingId: string;
  headingClassName: string;
  pathname: string;
  onVisit?: (href: string, id: string) => void;
};

export function ComponentNavigation({
  headingId,
  headingClassName,
  pathname,
  onVisit,
}: Props) {
  return (
    <>
      <h2 id={headingId} className={headingClassName}>
        Components
      </h2>
      <ul aria-labelledby={headingId}>
        {AllComponens.map((link) => (
          <li
            key={link.href}
            className={`2xl:text-sm text-[0.81em]  flex items-center gap-1 dark:hover:text-white 2xl:py-1 py-0.5 pl-2 border-l transition-all ${
              link.href === pathname
                ? 'dark:border-white border-black text-black dark:text-white font-semibold'
                : 'dark:text-slate-400 2xl:font-normal font-medium hover:border-black/60 dark:hover:border-white/50 text-slate-500 hover:text-slate-900'
            }`}
          >
            <Link
              href={link.href}
              onClick={() => onVisit?.(link.href, link.id)}
            >
              {link.componentName}
            </Link>
            {link?.isAlert && (
              <span className='2xl:text-xs text-[0.74em] bg-blue-500 text-white px-1 rounded'>
                {link?.isAlert}
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
