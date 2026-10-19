import Image from "next/image";

import { heroImage } from "@/lib/site-content";

export function Hero() {
  return (
    <section className="relative flex h-[85vh] min-h-[32rem] items-end overflow-hidden bg-ink">
      <Image
        src={heroImage}
        alt="Model wearing a tailored coat, carrying shopping bags"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

      <div className="container-edit relative pb-16 sm:pb-20 lg:pb-24">
        <p className="label-luxe mb-4 text-paper/80">New Season — 2026</p>
        <h1 className="max-w-xl text-[2.75rem] leading-[1.05] font-medium text-paper sm:text-display">
          Quiet luxury, made to last
        </h1>
        <p className="mt-5 max-w-md text-paper/80">
          A considered edit of tailoring, outerwear, and accessories — built
          from materials chosen to age well.
        </p>
        <a
          href="#new-arrivals"
          className="btn mt-8 border border-paper text-paper hover:bg-paper hover:text-ink"
        >
          Shop the Collection
        </a>
      </div>
    </section>
  );
}
