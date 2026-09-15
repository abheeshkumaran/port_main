"use client";

import Link from "next/link";
import { useState } from "react";

const links = [{ href: "/", label: "Home" }, { href: "/#work", label: "Work" }, { href: "/gallery", label: "Gallery" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  return <header className="absolute left-0 right-0 top-0 z-30 px-6 py-6 md:px-10 md:py-8">
    <nav className="mx-auto flex max-w-[1440px] items-center justify-between" aria-label="Main navigation">
      <Link href="/" className="display text-2xl tracking-tight">Mara Vale</Link>
      <div className="hidden items-center gap-8 text-[10px] uppercase tracking-[.2em] text-[#bcb7ae] md:flex">{links.map((link) => <Link key={link.href} href={link.href} className="transition-colors hover:text-white">{link.label}</Link>)}</div>
      <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="relative z-40 flex h-9 w-9 flex-col items-end justify-center gap-1.5 md:hidden"><span className={`block h-px w-6 bg-[#edeae4] transition-transform ${open ? "translate-y-1 rotate-45" : ""}`} /><span className={`block h-px bg-[#edeae4] transition-all ${open ? "w-6 -translate-y-1 -rotate-45" : "w-4"}`} /></button>
    </nav>
    {open && <div className="fixed inset-0 -z-10 flex flex-col justify-end bg-[#11100f] px-6 pb-12 pt-24 md:hidden"><div className="flex flex-col gap-5 text-4xl display">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}</div><p className="mt-10 text-xs tracking-[.15em] text-[#8d8982]">NEW YORK · 2025</p></div>}
  </header>;
}
