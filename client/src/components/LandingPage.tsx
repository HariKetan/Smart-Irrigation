import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
    <Card className="w-full max-w-2xl">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl sm:text-4xl font-bold">Welcome to Our Platform</CardTitle>
        <CardDescription className="text-base sm:text-lg">
          A modern authentication system built with Next.js and React
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <p className="text-center text-gray-600 text-sm sm:text-base">
          Get started by logging in or creating a new account. Our platform offers a secure and seamless authentication experience.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Learn More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </main>
  )
} 