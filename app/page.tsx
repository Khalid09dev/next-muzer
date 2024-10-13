import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Headphones, Radio } from "lucide-react"
import { Appbar } from "./components/Appbar"
import { Redirect } from "./components/Redirect"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gray-900 text-gray-100">
      <Appbar/>
      <Redirect/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-purple-300">
                Let Your Fans Choose the Tune
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                FanTune revolutionizes music streaming by putting your audience in control.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-colors">Get Started</Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center mb-12 text-purple-300">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-100">Fan Interaction</h3>
                <p className="text-gray-400">Let fans choose the music.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Headphones className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-100">High-Quality Streaming</h3>
                <p className="text-gray-400">Crystal clear audio experience.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Radio className="h-12 w-12 mb-4 text-purple-400" />
                <h3 className="text-xl font-bold mb-2 text-gray-100">Live DJ Sessions</h3>
                <p className="text-gray-400">Host live with fan requests.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="cta" className="w-full py-12 md:py-24 lg:py-32 bg-purple-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start?</h2>
              <p className="mx-auto max-w-[600px] text-purple-200 md:text-xl">
                Join FanTune today and create unforgettable music experiences.
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-[#111827] text-white border-[#111827]" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white transition-colors">
                    Sign Up
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2024 FanTune. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:text-purple-400 transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}