import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import React from 'react';
import { PaginatedPolls } from '@/types';

interface Props {
  paginated: PaginatedPolls;
}

export default function Pagination({ paginated }: Props) {
  if (!paginated || !paginated.links) return null;

  // If there's only a single page, don't render pagination controls
  if (paginated.meta && typeof paginated.meta.last_page === 'number' && paginated.meta.last_page <= 1) {
    return null;
  }

  const decodeLabel = (label: string) => {
    if (!label) return '';
    // decode common HTML entities used by Laravel paginator and strip tags
    const decoded = label
      .replace(/&laquo;/g, '«')
      .replace(/&raquo;/g, '»')
      .replace(/&nbsp;/g, ' ')
      .replace(/&ndash;/g, '–')
      .replace(/&hellip;/g, '…');
    return decoded.replace(/<[^>]*>/g, '').trim();
  };

  return (
    <nav className="mt-4 flex items-center justify-center">
      <ul className="inline-flex items-center gap-2">
        {paginated.links
          // Filter out translation keys and other non-numeric labels when paginator
          // returns keys like "pagination.previous" or "pagination.next" with null urls
          .filter((l: any) => {
            const lbl = String(l.label || '').trim();
            if (!lbl) return false;
            if (/^pagination\./.test(lbl)) return false;
            return true;
          })
          .map((link: any, idx: number) => {
          const isDisabled = link.url === null;
          const isActive = !!link.active;

          // Some labels contain HTML entities or tags; decode to plain text
          const label = decodeLabel(String(link.label || ''));

          if (isDisabled) {
            return (
              <li key={idx}>
                <Button variant={isActive ? 'ctasec' : 'outline'} size="sm" disabled>
                  {label}
                </Button>
              </li>
            );
          }

          return (
            <li key={idx}>
              <Button asChild size="sm" variant={isActive ? 'ctasec' : 'outline'}>
                <Link href={link.url}>{label}</Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
