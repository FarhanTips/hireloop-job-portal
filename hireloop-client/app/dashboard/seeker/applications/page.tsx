import { Download } from "lucide-react"

import ApplicationBoard from "@/components/application-board"
import { getApplications } from "@/lib/api/applications"
import { auth } from "@/lib/auth"
import type { applicationType } from "@/lib/types/applicationType"
import { headers } from "next/headers"

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const myApplications: applicationType[] = await getApplications(
    `applicantId=${session?.user.id}`
  )

  return (
    <main className="dark min-h-screen bg-[#08080a] px-4 py-8 text-white sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              My Applications
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Track your job applications and interview progress in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex rounded-lg bg-[#111116] p-1 text-sm">
              <button
                type="button"
                className="cursor-pointer rounded-md bg-white/10 px-4 py-1.5 font-medium text-white"
              >
                Active
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-md px-4 py-1.5 text-zinc-400 hover:text-white"
              >
                Archived
              </button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <Download className="size-4" />
              Export PDF
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-[#0c0c10] p-5">
            <p className="text-xs text-zinc-400">Total Applied</p>
            <p className="mt-2 text-3xl font-semibold">
              {myApplications.length}
            </p>
          </div>
        </div>

        <ApplicationBoard applications={myApplications} />
      </div>
    </main>
  )
}

export default MyApplicationsPage
