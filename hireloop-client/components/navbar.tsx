import Image from "next/image"
import Link from "next/link"

import logoImage from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"

const navLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

export function NavBar() {
  return (
    <header className="px-4 pt-6">
      <div className="mx-auto flex w-10/12 items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0f0f14] px-5 py-3">
        {/* Logo */}
        <Link href="/">
          <Image src={logoImage} alt="Hirelop" className="h-8 w-auto" />
        </Link>

        {/* Links - hidden on small screens */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sign in + button */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hidden text-sm text-zinc-400 hover:text-white sm:block"
          >
            Sign In
          </Link>
          <span className="hidden h-5 w-px bg-white/10 sm:block" />
          <Button className="bg-linear-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
