export interface JobType {
  jobTitle: string
  companyName: string
  jobCategory: string
  position: "Full-time" | "Part-time" | "Contract" | "Internship"
  remote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: "per hour" | "per month" | "per year"
  responsibilities: string
  requirements: string
}

// A job as it is stored in MongoDB, plus UI-only fields.
export interface JobRow extends JobType {
  _id: string
  applicants?: number
}
