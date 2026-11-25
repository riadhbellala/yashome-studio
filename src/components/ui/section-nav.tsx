"use client";

import { useEffect, useState } from "react";

/** Contents list that marks the section being read with a pink dot. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Sur cette page">
      <ul className="flex flex-col gap-3">
        {items.map((it) => {
          const on = it.id === active;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on ? "location" : undefined}
                className={`relative inline-flex items-center text-[15px] transition-colors duration-200 ${on ? "text-second" : "text-text-gray hover:text-second"}`}
              >
                <span aria-hidden className={`absolute -left-4 size-1.5 rounded-full bg-main transition-opacity duration-200 ${on ? "opacity-100" : "opacity-0"}`} />
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
