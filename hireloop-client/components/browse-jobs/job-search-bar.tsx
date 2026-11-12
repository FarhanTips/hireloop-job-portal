"use client"

import type { FormEvent } from "react"
import { Search } from "lucide-react"

/** Keyword search for the job board. */
export function JobSearchBar() {
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: apply the keyword search
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0c0c10] p-2 pl-3"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400">
        <Search className="size-4" />
      </span>

      <input
        type="search"
        name="search"
        placeholder="Search by job title, keywords..."
        aria-label="Search jobs"
        className="h-10 min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-zinc-500"
      />

      <button
        type="submit"
        className="h-10 shrink-0 cursor-pointer rounded-lg bg-zinc-100 px-5 text-sm font-semibold text-zinc-900 hover:bg-white"
      >
        Search Jobs
      </button>
    </form>
  )
}
