"use client";

import Image from "next/image";
import { useState } from "react";
import { categories, works } from "@/data/work";
import { Lightbox } from "@/components/Lightbox";
import { SiteNav } from "@/components/SiteNav";

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState<number | null>(null);
  const filtered = filter === "All" ? works : works.filter((work) => work.category === filter);
  return <main className="min-h-screen bg-[#11100f] px-6 pb-20 pt-32 md:px-10"><SiteNav /><div className="mx-auto max-w-[1440px]"><p className="eyebrow mb-5">Archive · 2023—2025</p><h1 className="display text-7xl leading-none md:text-[10rem]">Gallery</h1><div className="mt-16 flex flex-wrap gap-5 border-y border-white/10 py-5">{categories.map((category) => <button key={category} onClick={() => setFilter(category)} className={`text-[10px] uppercase tracking-[.16em] transition-colors ${filter === category ? "text-white" : "text-[#8d8982] hover:text-white"}`}>{category}</button>)}</div><div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">{filtered.map((work, index) => <button key={work.id} onClick={() => setActive(index)} className="group mb-6 block w-full break-inside-avoid text-left"><div className={`image-frame relative ${index % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/5]"}`}><Image src={work.image} alt={work.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" /></div><div className="mt-3 flex justify-between text-xs"><span>{work.title}</span><span className="text-[#8d8982]">{work.category}</span></div></button>)}</div>{filtered.length === 0 && <p className="py-20 text-[#8d8982]">Gallery coming soon.</p>}</div>{active !== null && <Lightbox items={filtered} index={active} onClose={() => setActive(null)} onChange={setActive} />}</main>;
}
