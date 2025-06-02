"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft, Compass, Rocket, SpaceIcon as Planet, Stars, Satellite } from "lucide-react"

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false)
  const [starPositions, setStarPositions] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([])

  useEffect(() => {
    // Generate random star positions
    const stars = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
    }))

    setStarPositions(stars)

    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden px-4">
      {/* Animated stars background */}
      {starPositions.map((star, index) => (
        <div
          key={index}
          className="absolute rounded-full bg-white opacity-0 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${3 + star.delay}s`,
            opacity: isVisible ? 0.7 : 0,
          }}
        />
      ))}

      {/* Floating planets */}
      <div
        className="absolute -top-20 -right-20 text-indigo-900 opacity-0 transition-all duration-1000 ease-out"
        style={{
          transform: isVisible ? "translate(-30px, 30px) rotate(15deg)" : "translate(0, 0) rotate(0deg)",
          opacity: isVisible ? 0.2 : 0,
        }}
      >
        <Planet size={180} />
      </div>

      <div
        className="absolute -bottom-16 -left-16 text-indigo-700 opacity-0 transition-all duration-1000 ease-out"
        style={{
          transform: isVisible ? "translate(20px, -20px) rotate(-10deg)" : "translate(0, 0) rotate(0deg)",
          opacity: isVisible ? 0.15 : 0,
          transitionDelay: "0.3s",
        }}
      >
        <Planet size={150} />
      </div>

      {/* Satellite slowly orbiting */}
      <div
        className="absolute opacity-0 transition-opacity duration-1000"
        style={{
          opacity: isVisible ? 0.6 : 0,
          animation: isVisible ? "orbit 30s linear infinite" : "none",
          top: "30%",
          left: "60%",
        }}
      >
        <Satellite className="text-slate-400" size={24} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full space-y-8 text-center">
        <div
          className="relative flex justify-center opacity-0 transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
          }}
        >
          <AlertCircle className="text-red-500" size={80} />
          <div
            className="absolute animate-ping rounded-full bg-red-500 opacity-30"
            style={{
              width: "80px",
              height: "80px",
              animationDuration: "3s",
            }}
          />
        </div>

        <h1
          className="text-5xl font-extrabold text-white mt-6 opacity-0 transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "0.2s",
          }}
        >
          404
        </h1>

        <h2
          className="text-2xl font-bold text-white mt-2 opacity-0 transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "0.3s",
          }}
        >
          Houston, we have a problem
        </h2>

        <p
          className="text-slate-400 mt-4 opacity-0 transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "0.4s",
          }}
        >
          The page you're looking for has drifted into deep space or never existed in this universe.
        </p>

        <div
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4 opacity-0 transition-all duration-700 ease-out"
          style={{
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            opacity: isVisible ? 1 : 0,
            transitionDelay: "0.5s",
          }}
        >
          <Button asChild variant="default" className="group relative overflow-hidden">
            <Link href="/">
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Return Home
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </Button>

          <Button asChild variant="outline" className="group border-slate-700 text-slate-300">
            <Link href="/">
              <span className="flex items-center gap-2">
                <Compass size={16} className="transition-transform group-hover:rotate-45" />
                Explore Site
              </span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Animated rocket */}
      <div
        className="absolute opacity-0 transition-all duration-1000 ease-out"
        style={{
          bottom: isVisible ? "15%" : "5%",
          right: isVisible ? "15%" : "5%",
          opacity: isVisible ? 0.7 : 0,
          transitionDelay: "0.7s",
          transform: "rotate(-45deg)",
        }}
      >
        <div className="relative">
          <Rocket size={40} className="text-slate-300" />
          <div className="absolute -bottom-6 -left-1 w-2 h-10 bg-gradient-to-t from-transparent to-orange-500 rounded-full opacity-70 animate-pulse" />
        </div>
      </div>

      {/* Stars icon with subtle rotation */}
      <div
        className="absolute top-1/4 left-1/5 opacity-0 transition-all duration-1000 ease-out"
        style={{
          opacity: isVisible ? 0.3 : 0,
          animation: isVisible ? "spin 30s linear infinite" : "none",
          transitionDelay: "0.6s",
        }}
      >
        <Stars size={50} className="text-indigo-300" />
      </div>
    </div>
  )
}
