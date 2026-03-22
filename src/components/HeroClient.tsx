"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Chess3D = dynamic(() => import("@/components/Chess3D"), { ssr: false });

export default function HeroClient({ dict, locale }: { dict: any; locale: string }) {
  const otherLocale = locale === "pl" ? "en" : "pl";

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans antialiased">

      {/* ─── Header ─── */}
      <header className="relative z-30 flex h-14 md:h-16 items-center justify-between px-5 md:px-10 border-b border-white/5 bg-black/30 backdrop-blur-md">
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
          <span className="text-lg md:text-xl font-extralight tracking-[0.25em] uppercase group-hover:opacity-80 transition">
            Chess
          </span>
          <span className="text-lg md:text-xl font-bold tracking-[0.15em] text-amber-200/80 uppercase">
            Museum
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-medium">
          <Link href={`/${locale}`} className="text-white/90 hover:text-amber-200 transition border-b border-amber-200/40 pb-0.5">
            {dict.common.home}
          </Link>
          <Link href={`/${locale}/gallery`} className="text-white/40 hover:text-white transition">
            {dict.common.gallery}
          </Link>
        </nav>

        {/* Language Switch with Flags */}
        <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
          <Link
            href="/pl"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.15em] font-bold uppercase transition-all ${
              locale === "pl"
                ? "bg-white/10 text-white"
                : "text-white/30 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className="w-4 h-3 rounded-sm overflow-hidden flex-shrink-0">
              <rect width="640" height="240" fill="#fff" />
              <rect y="240" width="640" height="240" fill="#dc143c" />
            </svg>
            PL
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <Link
            href="/en"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.15em] font-bold uppercase transition-all ${
              locale === "en"
                ? "bg-white/10 text-white"
                : "text-white/30 hover:text-white/60 hover:bg-white/5"
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-4 h-3 rounded-sm overflow-hidden flex-shrink-0">
              <clipPath id="s"><path d="M0 0v30h60V0z"/></clipPath>
              <clipPath id="t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath>
              <g clipPath="url(#s)">
                <path d="M0 0v30h60V0z" fill="#012169"/>
                <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6"/>
                <path d="M0 0l60 30m0-30L0 30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
              </g>
            </svg>
            EN
          </Link>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <main className="relative flex-1 flex flex-col md:flex-row">
        {/* 3D Canvas — full background on mobile, right side on desktop */}
        <div className="absolute inset-0 md:relative md:order-2 md:flex-1">
          <Chess3D />
          {/* Gradient overlay so text is readable on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/30 to-[#0a0a0a]/70 md:bg-gradient-to-r md:from-[#0a0a0a]/60 md:via-transparent md:to-transparent pointer-events-none" />
        </div>

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 py-16 md:py-0 md:w-[46%] md:max-w-[600px] md:order-1 min-h-[85vh] md:min-h-0">

          <div className="inline-flex items-center self-start gap-2 bg-white/5 border border-white/8 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.25em] text-amber-200/70">
              {dict.landing.badge}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-[1.1] tracking-tight mb-6">
            {dict.landing.title_top}
            <br />
            <span className="font-extrabold bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
              {dict.landing.title_bottom}
            </span>
          </h1>

          <p className="text-white/40 text-sm md:text-base max-w-md leading-relaxed tracking-wide font-light mb-10">
            {dict.landing.hero_description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/gallery`}
              className="px-7 py-3 bg-amber-200 text-black font-bold rounded-lg text-xs tracking-[0.15em] uppercase hover:bg-amber-100 hover:shadow-[0_0_30px_rgba(252,211,77,0.2)] transition-all duration-300 hover:-translate-y-0.5"
            >
              {dict.landing.browse_gallery}
            </Link>
            <button className="px-7 py-3 border border-white/12 text-white/70 font-semibold rounded-lg text-xs tracking-[0.15em] uppercase hover:border-white/25 hover:text-white transition-all duration-300">
              {dict.landing.cta_button}
            </button>
          </div>

          {/* Game indicator */}
          <div className="mt-12 flex items-center gap-3 text-[9px] tracking-[0.3em] uppercase text-white/20 font-medium">
            <div className="h-px w-8 bg-white/10" />
            Byrne vs Fischer, 1956
            <div className="h-px w-8 bg-white/10" />
          </div>
        </div>
      </main>
    </div>
  );
}
