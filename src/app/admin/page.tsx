"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { works, type Work } from "@/data/work";

const PASSWORD_KEY = "mara-admin-password";
const AUTH_KEY = "mara-admin-authenticated";
const DEFAULT_PASSWORD = "mmmm";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [items, setItems] = useState<Work[]>(works);
  const [saved, setSaved] = useState(false);
  const [showPasswordPanel, setShowPasswordPanel] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAuthenticated(window.sessionStorage.getItem(AUTH_KEY) === "true");
      const storedWorks = window.localStorage.getItem("mara-works");
      if (storedWorks) setItems(JSON.parse(storedWorks));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentPassword = window.localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
    if (password !== currentPassword) {
      setLoginError("That password is not correct.");
      return;
    }
    window.sessionStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
    setLoginError("");
  }

  function logout() {
    window.sessionStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }

  if (!authenticated) {
    return <main className="flex min-h-screen items-center justify-center bg-[#11100f] px-6 text-[#edeae4]"><form onSubmit={login} className="w-full max-w-sm border-t border-white/20 pt-5"><Link href="/" className="display text-3xl">Lakshmi Nair</Link><p className="eyebrow mt-16">Studio admin</p><h1 className="display mt-4 text-6xl leading-none">Private<br />access.</h1><label className="mt-12 block"><span className="eyebrow">Password</span><input autoFocus required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-3 w-full border-b border-white/20 bg-transparent pb-3 text-base outline-none focus:border-white" /></label>{loginError && <p role="alert" className="mt-3 text-sm text-[#c8947b]">{loginError}</p>}<button className="mt-8 border-b border-white pb-2 text-xs uppercase tracking-[.16em]">Enter studio ↗</button><p className="mt-8 text-xs text-[#8d8982]">Default password: mmmm</p></form></main>;
  }

  function toggle(id: number) { setItems((current) => current.map((item) => item.id === id ? { ...item, showOnHome: !item.showOnHome } : item)); setSaved(false); }
  function save() { window.localStorage.setItem("mara-works", JSON.stringify(items)); setSaved(true); }

  return <main className="min-h-screen bg-[#e7e3dc] text-[#171615]"><aside className="fixed bottom-0 left-0 top-0 hidden w-60 border-r border-black/10 p-8 md:block"><Link href="/" className="display text-3xl">Lakshmi Nair</Link><p className="eyebrow mt-16 !text-[#77736d]">Studio admin</p><nav className="mt-8 flex flex-col gap-4 text-sm"><span className="font-medium">Overview</span><span className="text-[#77736d]">Work & gallery</span><button onClick={() => setShowPasswordPanel((current) => !current)} className="text-left text-[#77736d]">Change password</button><span className="text-[#77736d]">Settings</span></nav><button onClick={logout} className="absolute bottom-16 text-xs text-[#77736d]">Log out</button><Link href="/" className="absolute bottom-8 text-xs text-[#77736d]">← View site</Link></aside><div className="px-6 py-8 md:ml-60 md:px-12 md:py-12"><div className="flex items-start justify-between"><div><p className="eyebrow !text-[#77736d]">Tuesday, September 15</p><h1 className="display mt-3 text-6xl">Good morning.</h1></div><button onClick={logout} className="text-xs text-[#77736d] md:hidden">Log out</button></div>{showPasswordPanel && <ChangePassword onClose={() => setShowPasswordPanel(false)} />}<div className="mt-14 grid gap-3 sm:grid-cols-3"><Stat label="Portfolio images" value={String(items.length).padStart(2, "0")} /><Stat label="On homepage" value={String(items.filter((item) => item.showOnHome).length).padStart(2, "0")} /><Stat label="Categories" value="05" /></div><section className="mt-14"><div className="flex items-end justify-between border-b border-black/15 pb-4"><div><p className="eyebrow !text-[#77736d]">Content</p><h2 className="mt-2 text-xl">Homepage selection</h2></div><button onClick={save} className="border-b border-black pb-1 text-xs uppercase tracking-[.14em]">{saved ? "Saved ✓" : "Save changes"}</button></div><p className="mt-4 max-w-lg text-sm leading-6 text-[#77736d]">Choose which published work appears in the homepage edit. This local prototype stores your selection in this browser.</p><div className="mt-8 divide-y divide-black/10">{items.map((item) => <div key={item.id} className="flex items-center gap-4 py-4"><div className="relative h-16 w-12 overflow-hidden bg-black/10"><img src={item.image} alt="" className="h-full w-full object-cover" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm">{item.title}</p><p className="mt-1 text-xs text-[#77736d]">{item.category} · {item.year}</p></div><button onClick={() => toggle(item.id)} aria-pressed={item.showOnHome} className={`h-6 w-11 rounded-full p-1 transition-colors ${item.showOnHome ? "bg-[#171615]" : "bg-black/15"}`}><span className={`block h-4 w-4 rounded-full bg-[#e7e3dc] transition-transform ${item.showOnHome ? "translate-x-5" : ""}`} /></button><span className="hidden w-20 text-right text-[10px] uppercase tracking-widest text-[#77736d] sm:block">{item.showOnHome ? "Home" : "Hidden"}</span></div>)}</div></section></div></main>;
}

function ChangePassword({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const storedPassword = window.localStorage.getItem(PASSWORD_KEY) ?? DEFAULT_PASSWORD;
    if (current !== storedPassword) return setMessage("Current password is not correct.");
    if (next.length < 4) return setMessage("Use at least 4 characters.");
    if (next !== confirmation) return setMessage("New passwords do not match.");
    window.localStorage.setItem(PASSWORD_KEY, next);
    setMessage("Password updated.");
    setCurrent(""); setNext(""); setConfirmation("");
  }

  return <form onSubmit={submit} className="mt-8 max-w-md border-y border-black/15 py-6"><div className="flex items-center justify-between"><h2 className="text-xl">Change password</h2><button type="button" onClick={onClose} className="text-xs text-[#77736d]">Close</button></div><div className="mt-6 space-y-5"><input required type="password" placeholder="Current password" value={current} onChange={(event) => setCurrent(event.target.value)} className="w-full border-b border-black/15 bg-transparent pb-2 text-sm outline-none focus:border-black" /><input required type="password" placeholder="New password" value={next} onChange={(event) => setNext(event.target.value)} className="w-full border-b border-black/15 bg-transparent pb-2 text-sm outline-none focus:border-black" /><input required type="password" placeholder="Confirm new password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="w-full border-b border-black/15 bg-transparent pb-2 text-sm outline-none focus:border-black" /></div>{message && <p role="status" className="mt-4 text-sm text-[#77736d]">{message}</p>}<button className="mt-6 border-b border-black pb-1 text-xs uppercase tracking-[.14em]">Update password</button></form>;
}

function Stat({ label, value }: { label: string; value: string }) { return <div className="border border-black/10 p-5"><p className="text-3xl">{value}</p><p className="mt-2 text-xs text-[#77736d]">{label}</p></div>; }
