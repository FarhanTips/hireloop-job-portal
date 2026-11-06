import Image from "next/image"
import { House, MapPin, Search } from "lucide-react"

import globeImage from "@/app/images/globe-banner.png"

const trending = ["Product Designer", "AI Engineering", "DevOps Engineer"]

export function Banner() {
  return (
    <section className="bg-[#07070a] pt-16 text-white">
      <div className="mx-auto flex w-10/12 flex-col items-center px-4 text-center">
        {/* Small badge */}
        <div className="flex items-center gap-3">
          <span className="hidden h-px w-10 bg-white/20 sm:block" />
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <House className="size-3.5 text-orange-500" />
            <span className="text-xs font-semibold">50,000+</span>
            <span className="font-mono text-[10px] tracking-widest text-zinc-400">
              NEW JOBS THIS MONTH
            </span>
          </div>
          <span className="hidden h-px w-10 bg-white/20 sm:block" />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-xl text-sm text-zinc-400 sm:text-base">
          Hirelop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role - faster.
        </p>

        {/* Search box */}
        <div className="mt-8 flex w-full max-w-2xl flex-col gap-2 rounded-xl border border-white/10 bg-[#0f0f14] p-2 sm:flex-row sm:items-center">
          <label className="flex flex-1 items-center gap-2 px-2">
            <Search className="size-4 shrink-0 text-zinc-500" />
            <input
              type="text"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </label>

          <span className="hidden h-6 w-px bg-white/10 sm:block" />

          <label className="flex flex-1 items-center gap-2 px-2">
            <MapPin className="size-4 shrink-0 text-zinc-500" />
            <input
              type="text"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </label>

          <button
            type="button"
            aria-label="Search jobs"
            className="flex h-10 items-center justify-center rounded-lg bg-linear-to-r from-indigo-500 to-violet-500 px-3 hover:opacity-90"
          >
            <Search className="size-4" />
          </button>
        </div>

        {/* Trending tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500">
          <span>Trending Position</span>
          {trending.map((item) => (
            <button
              key={item}
              type="button"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 hover:border-white/20 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Globe image with text on top */}
      <div className="relative mt-10">
        <Image src={globeImage} alt="" className="h-auto w-full" />
        <p className="absolute inset-x-0 bottom-[20%] px-6 text-center text-2xl font-medium sm:text-4xl">
          Assisting over 15,000 job seekers
          <br />
          find their dream positions.
        </p>
      </div>
    </section>
  )
}
