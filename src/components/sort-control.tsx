"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortControl({ sort }: { sort: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    const qs = params.toString();
    router.push(`/shop${qs ? `?${qs}` : ""}`);
  }

  return (
    <label className="label-luxe flex items-center gap-2 text-stone">
      Sort
      <select
        value={sort}
        onChange={(e) => handleChange(e.target.value)}
        className="label-luxe cursor-pointer border-b border-line bg-transparent py-1 text-ink focus:border-ink focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
