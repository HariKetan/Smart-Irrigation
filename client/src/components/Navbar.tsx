"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-17 items-center px-4 w-full">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl">
            Your Logo
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 