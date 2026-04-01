"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "home" },
    { href: "/writings", label: "writings" },
  ];

  return (
    <nav className="flex gap-6 mb-16 text-sm">
      {links.map(({ href, label }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`hover:no-underline transition-colors ${
              isActive
                ? "text-[#1a1a1a] font-medium"
                : "text-[#999] hover:text-[#1a1a1a]"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
