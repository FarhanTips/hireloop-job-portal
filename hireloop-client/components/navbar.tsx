import Image from "next/image"
import Link from "next/link"

import logoImage from "@/app/images/logo.png"
import UserInfo from "./userInfo"

const navLinks = [
  { label: "Browse Jobs", href: "#" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

export function NavBar() {
  return (
    <div className="bg-[#15171dFF]">
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
          <UserInfo></UserInfo>
        </div>
      </header>
    </div>

  )
}
