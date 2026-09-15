"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { works } from "@/data/work";
import { Lightbox } from "./Lightbox";
import { SiteNav } from "./SiteNav";

export function WorkPage() {
  const [active, setActive] = useState<number | null>(null);
  const router = useRouter();
  const homeWorks = works.filter((work) => work.showOnHome);
  useEffect(() => {
    function openAdmin(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (target.textContent?.trim() === "Lakshmi Nair") router.push("/admin");
    }
    document.addEventListener("dblclick", openAdmin);
    return () => document.removeEventListener("dblclick", openAdmin);
  }, [router]);
  return <main className="grain min-h-screen bg-[#11100f]"><section className="relative flex min-h-[92svh] items-end overflow-hidden px-6 pb-14 pt-28 md:px-10 md:pb-20"><SiteNav /><div className="absolute inset-0"><Image src={works[0].image} alt={works[0].alt} fill priority sizes="100vw" className="object-cover object-[center_20%] opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-[#11100f] via-transparent to-[#11100f]/30" /></div><div className="relative z-10 mx-auto w-full max-w-[1440px] reveal"><p className="eyebrow mb-5">Model · Fashion · Editorial</p><h1 className="display max-w-3xl text-[clamp(4.5rem,13vw,12rem)] leading-[.76] tracking-[-.055em]">Lakshmi<br /><span className="pl-[.18em]">Nair</span></h1><div className="mt-12 flex items-end justify-between border-t border-white/20 pt-4"><p className="max-w-xs text-xs leading-5 text-[#bcb7ae]">A study in movement, presence,<br />and the spaces between.</p><span className="eyebrow animate-pulse">Scroll to explore ↓</span></div></div></section><section id="work" className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36"><div className="mb-16 flex items-end justify-between"><div><p className="eyebrow mb-4">01 — Selected work</p><h2 className="display text-6xl leading-none md:text-8xl">The edit</h2></div><Link href="/gallery" className="hidden border-b border-[#8d8982] pb-1 text-xs uppercase tracking-[.15em] text-[#bcb7ae] md:block">View all work ↗</Link></div><div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">{homeWorks.map((work, index) => <button key={work.id} onClick={() => setActive(index)} className={`group text-left md:col-span-${index === 1 ? "5 md:col-start-8" : index === 2 ? "7 md:col-start-3" : "6"}`}><div className={`image-frame relative ${index === 0 ? "aspect-[4/5]" : index === 1 ? "aspect-[3/4]" : "aspect-[5/4]"}`}><Image src={work.image} alt={work.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" /></div><div className="mt-4 flex justify-between text-xs"><span>{work.title}</span><span className="text-[#8d8982]">{work.category} · {work.year}</span></div></button>)}</div></section><section className="border-y border-white/10 px-6 py-24 md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12 md:items-end"><p className="eyebrow md:col-span-3">02 — The practice</p><p className="display text-5xl leading-[.95] md:col-span-7 md:col-start-6 md:text-7xl">“The camera is a conversation. I am interested in what happens when it gets quiet.”</p></div></section><footer className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 px-6 py-16 md:flex-row md:items-end md:px-10"><div><p className="display text-3xl">Lakshmi Nair</p><p className="mt-3 text-xs text-[#8d8982]">Represented in New York & London</p></div><div className="flex gap-6 text-xs text-[#bcb7ae]"><Link href="/contact">Bookings</Link><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><Link href="/admin">Admin</Link></div></footer>{active !== null && <Lightbox items={homeWorks} index={active} onClose={() => setActive(null)} onChange={setActive} />}</main>;
}
