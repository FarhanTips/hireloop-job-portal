import { JobCard } from "@/components/browse-jobs/job-card"
import { JobFilters } from "@/components/browse-jobs/job-filters"
import { JobSearchBar } from "@/components/browse-jobs/job-search-bar"
import { getJobs } from "@/lib/api/jobs"
import type { JobRow } from "@/lib/types/jobType"

interface BrowseJobsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

/** Flattens Next's search params into a query string for the jobs API. */
const toQueryString = (
  params: Record<string, string | string[] | undefined>
) => {
  const query = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    const firstValue = Array.isArray(value) ? value[0] : value
    if (firstValue) query.set(key, firstValue)
  }

  return query.toString()
}

const BrowseJobsPage = async ({ searchParams }: BrowseJobsPageProps) => {
  const query = toQueryString(await searchParams)
  const jobs: JobRow[] = await getJobs(query)

  return (
    <main className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <JobSearchBar />

        <div className="grid items-start gap-6 lg:grid-cols-[260px_1fr]">
          <JobFilters />

          <section aria-label="Job results">
            <h1 className="mb-4 text-lg font-semibold sm:text-xl">
              Found {jobs.length.toLocaleString()} Professional Jobs
            </h1>

            {jobs.length > 0 ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="rounded-2xl border border-dashed border-white/10 bg-[#0c0c10] px-5 py-12 text-center text-sm text-zinc-500">
                No jobs found. Try a different keyword or filter.
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default BrowseJobsPage
