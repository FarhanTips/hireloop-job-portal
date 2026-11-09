

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
