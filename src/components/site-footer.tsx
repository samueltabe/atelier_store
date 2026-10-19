const FOOTER_LINKS = {
  "Customer Care": ["Contact Us", "Shipping & Returns", "Size Guide", "FAQ"],
  Company: ["About", "Sustainability", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Settings"],
};

export function SiteFooter() {
  return (
    <footer className="divider border-t">
      <div className="container-edit grid grid-cols-2 gap-10 py-16 sm:grid-cols-4 lg:py-20">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-xl font-medium tracking-[0.3em]">ATELIER</p>
          <p className="mt-4 max-w-[20rem] text-sm text-ink-soft">
            Considered essentials, made from materials chosen to age well.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading}>
            <p className="label-luxe text-stone">{heading}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-ink-soft hover:text-ink">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="divider border-t">
        <div className="container-edit flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="label-luxe text-stone">
            &copy; 2026 Atelier. All rights reserved.
          </p>
          <div className="label-luxe flex gap-6 text-stone">
            <a href="#" className="hover:text-ink">
              Instagram
            </a>
            <a href="#" className="hover:text-ink">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
