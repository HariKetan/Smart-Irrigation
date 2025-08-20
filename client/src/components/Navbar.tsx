"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Droplets} from "lucide-react"

export function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="flex h-17 items-center px-4 w-full">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Droplets className="w-5 h-5" />
            <span>Smart Irrigation</span>
            
          </Link>
         
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
} 