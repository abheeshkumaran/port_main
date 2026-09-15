"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Work } from "@/data/work";

export function Lightbox({ items, index, onClose, onChange }: { items: Work[]; index: number; onClose: () => void; onChange: (next: number) => void }) {
  const item = items[index];
  useEffect(() => { const key = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); if (event.key === "ArrowRight") onChange((index + 1) % items.length); if (event.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length); }; window.addEventListener("keydown", key); document.body.style.overflow = "hidden"; return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; }; }, [index, items.length, onChange, onClose]);
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0c0b0b]/95 p-4 md:p-10" role="dialog" aria-modal="true" aria-label={`${item.title} image viewer`}><button onClick={onClose} aria-label="Close image viewer" className="absolute right-6 top-6 text-3xl font-light text-white">×</button><button onClick={() => onChange((index - 1 + items.length) % items.length)} aria-label="Previous image" className="absolute left-4 top-1/2 text-3xl text-white md:left-8">‹</button><div className="relative h-[75vh] w-full max-w-5xl"><Image src={item.image} alt={item.alt} fill sizes="90vw" className="object-contain" priority /></div><button onClick={() => onChange((index + 1) % items.length)} aria-label="Next image" className="absolute right-4 top-1/2 text-3xl text-white md:right-8">›</button><div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center"><p className="text-sm">{item.title}</p><p className="eyebrow mt-1">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</p></div></div>;
}
