import Link from "next/link";

import { NAV_LINKS } from "@/lib/nav-links";

import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="divider sticky top-0 z-40 border-b bg-paper/95 backdrop-blur">
      <div className="label-luxe hidden justify-center bg-ink py-2 text-paper lg:flex">
        Complimentary shipping on all orders over $200
      </div>

      <div className="container-edit relative flex h-20 items-center justify-between">
        <MobileNav />

        <Link href="/" className="text-xl font-medium tracking-[0.3em]">
          ATELIER
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link whitespace-nowrap">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button type="button" aria-label="Search" className="hover:text-ink-soft">
            <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
              <circle cx="9" cy="9" r="6.25" stroke="currentColor" strokeWidth="1.25" />
              <path d="M18 18L13.8 13.8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" aria-label="Account" className="hidden hover:text-ink-soft sm:block">
            <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
              <circle cx="10" cy="6.5" r="3.5" stroke="currentColor" strokeWidth="1.25" />
              <path
                d="M3 18c0-3.59 3.13-6.5 7-6.5s7 2.91 7 6.5"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Bag, 0 items"
            className="flex items-center gap-1.5 hover:text-ink-soft"
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-[18px] w-[18px]">
              <path
                d="M5.5 7.5h9l.7 9.5h-10.4l.7-9.5Z"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
              <path d="M7.5 7.5v-1a2.5 2.5 0 0 1 5 0v1" stroke="currentColor" strokeWidth="1.25" />
            </svg>
            <span className="label-luxe hidden sm:inline">0</span>
          </button>
        </div>
      </div>
    </header>
  );
}
