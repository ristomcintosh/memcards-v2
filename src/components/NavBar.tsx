import Link from "next/link"
import { ThemeToggle } from "./ThemeToggle"
import { LogoText } from "./Logo"
import { Logout } from "@/features/home-page/Logout"

export function NavBar() {
  return (
    <header className="dark:bg-surface-dark bg-surface-light shadow">
      <div className="flex justify-between items-center px-4 py-4 text-lg max-w-screen-xl mx-auto">
        <nav className="w-full max-w-28 sm:max-w-28">
          <Link href="/" aria-label="Home">
            <LogoText aria-hidden />
          </Link>
        </nav>
        <div className="flex items-center gap-x-2">
          <ThemeToggle />
          <Logout />
        </div>
      </div>
    </header>
  )
}
