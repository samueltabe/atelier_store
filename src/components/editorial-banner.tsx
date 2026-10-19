import Image from "next/image";

import { editorialImage } from "@/lib/site-content";

export function EditorialBanner() {
  return (
    <section className="divider grid grid-cols-1 border-t lg:grid-cols-2">
      <div className="relative aspect-[4/3] lg:aspect-auto">
        <Image
          src={editorialImage}
          alt="Rail of neutral-toned garments in a quiet boutique"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 sm:py-24 lg:px-20">
        <p className="label-luxe text-stone">Our Craft</p>
        <h2 className="mt-4 max-w-md text-h2">Made to be worn for years, not seasons</h2>
        <p className="mt-5 max-w-md text-ink-soft">
          Every piece is developed with mills and workshops we return to
          season after season, chosen for consistency of material over
          speed of production.
        </p>
        <a href="#" className="btn-outline mt-8 inline-flex self-start">
          Our Process
        </a>
      </div>
    </section>
  );
}
