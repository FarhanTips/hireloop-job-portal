"use client"

import { useRouter } from "next/navigation"
import type { ChangeEvent } from "react"

const sameLabelOptions = (values: string[]) =>
  values.map((value) => ({ label: value, value }))

const FILTER_GROUPS = [
  {
    id: "position",
    label: "Job Type",
    options: sameLabelOptions([
      "Full-time",
      "Part-time",
      "Contract",
      "Internship",
    ]),
  },
  {
    id: "jobCategory",
    label: "Job Category",
    options: sameLabelOptions([
      "Engineering & Tech",
      "Design",
      "Marketing",
      "Sales",
      "Finance",
      "Operations",
      "Other",
    ]),
  },
  {
    id: "remote",
    label: "Work Mode",
    // The jobs API expects `remote=true|false`, so labels map to those values.
    options: [
      { label: "Remote", value: "true" },
      { label: "On-site", value: "false" },
    ],
  },
]

/** Single-select filter sidebar. */
export function JobFilters() {
  const router = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // Single key/value pair, e.g. { position: "Part-time" }

    console.log(name, value);

    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    // console.log("params", params.toString())
    router.push(`/browse-jobs?${params.toString()}`)

  }

  return (
    <aside
      aria-label="Job filters"
      className="h-fit rounded-2xl border border-white/10 bg-[#0c0c10] p-5 lg:sticky lg:top-6"
    >
      <h2 className="text-base font-semibold">Filters</h2>

      <div className="mt-5 space-y-6">
        {FILTER_GROUPS.map((group) => (
          <fieldset key={group.id}>
            <legend className="mb-3 text-xs font-medium tracking-wide text-zinc-400 uppercase">
              {group.label}
            </legend>

            <div className="space-y-3">
              {group.options.map((option) => (
                <label
                  key={option.value}
                  className="group flex cursor-pointer items-center gap-2.5 text-sm text-zinc-400 select-none hover:text-zinc-200"
                >
                  <input
                    type="radio"
                    name={group.id}
                    value={option.value}
                    onChange={handleOnChange}
                    className="peer sr-only"
                  />
                  <span className="size-4 shrink-0 rounded-full border border-white/15 transition-colors group-has-focus-visible:ring-2 group-has-focus-visible:ring-violet-500/40 peer-checked:border-[5px] peer-checked:border-violet-500" />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
    </aside>
  )
}
