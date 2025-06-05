"use client"

import { useEffect, useState } from "react"

interface MorphingLoaderProps {
    message?: string
    color?: string
}

export default function MorphingLoader({ message = "Loading...", color = "#09b96d" }: MorphingLoaderProps) {
    const [mounted, setMounted] = useState(false)

    // Color mapping for Tailwind classes
    const colorMap: Record<string, { bg: string; glow: string; text: string }> = {
        purple: {
            bg: "from-purple-500 to-violet-600",
            glow: "from-purple-400/30 to-violet-500/30",
            text: "text-purple-900",
        },
        blue: {
            bg: "from-blue-500 to-cyan-600",
            glow: "from-blue-400/30 to-cyan-500/30",
            text: "text-blue-900",
        },
        green: {
            bg: "from-emerald-500 to-green-600",
            glow: "from-emerald-400/30 to-green-500/30",
            text: "text-emerald-900",
        },
        amber: {
            bg: "from-amber-500 to-orange-600",
            glow: "from-amber-400/30 to-orange-500/30",
            text: "text-amber-900",
        },
        rose: {
            bg: "from-rose-500 to-pink-600",
            glow: "from-rose-400/30 to-pink-500/30",
            text: "text-rose-900",
        },
    }

    // Helper function to adjust color brightness
    const adjustBrightness = (hex: string, percent: number) => {
        // Convert hex to RGB
        let r = Number.parseInt(hex.substring(1, 3), 16)
        let g = Number.parseInt(hex.substring(3, 5), 16)
        let b = Number.parseInt(hex.substring(5, 7), 16)

        // Adjust brightness
        r = Math.min(255, Math.max(0, Math.round(r * percent)))
        g = Math.min(255, Math.max(0, Math.round(g * percent)))
        b = Math.min(255, Math.max(0, Math.round(b * percent)))

        // Convert back to hex
        return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
    }

    // Check if color is a hex value
    const isHexColor = color.startsWith("#")

    // Generate custom color styles if hex is provided
    const customColorStyle = isHexColor
        ? {
            blob: {
                background: `linear-gradient(to bottom right, ${color}, ${adjustBrightness(color, 0.8)})`,
            },
            glow: {
                background: `linear-gradient(to bottom right, ${color}4D, ${adjustBrightness(color, 0.8)}4D)`, // 4D = 30% opacity in hex
            },
            text: {
                color: adjustBrightness(color, 0.6), // Darker text for better readability
            },
        }
        : null

    // Use either predefined Tailwind classes or custom styles
    const colorStyle = isHexColor ? null : colorMap[color as keyof typeof colorMap] || colorMap.green

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="relative flex flex-col items-center">
                {/* Glow effect */}
                {isHexColor ? (
                    <div className="absolute inset-0 -z-10 h-full w-full rounded-full blur-2xl" style={customColorStyle?.glow} />
                ) : (
                    <div
                        className={`absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-br ${colorStyle?.glow} blur-2xl`}
                    />
                )}

                {/* Morphing blob */}
                <div className="relative h-32 w-32">
                    {mounted &&
                        (isHexColor ? (
                            <div className="absolute inset-0 rounded-blob shadow-lg" style={customColorStyle?.blob} />
                        ) : (
                            <div className={`absolute inset-0 rounded-blob bg-gradient-to-br ${colorStyle?.bg} shadow-lg`} />
                        ))}

                    {/* Inner highlight */}
                    <div className="absolute left-3 top-3 h-6 w-6 rounded-full bg-white/30 blur-sm" />

                    <style jsx>{`
            .rounded-blob {
              border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              animation: morph 8s ease-in-out infinite;
            }
            
            @keyframes morph {
              0% {
                border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              }
              25% { 
                border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
              }
              50% {
                border-radius: 50% 60% 30% 70% / 40% 40% 70% 60%;
              }
              75% {
                border-radius: 70% 30% 50% 40% / 30% 50% 60% 70%;
              }
              100% {
                border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
              }
            }
          `}</style>
                </div>

                {/* Message */}
                {message && (
                    <div className="mt-8 text-center">
                        <p
                            className={isHexColor ? "text-lg font-medium" : `text-lg font-medium ${colorStyle?.text}`}
                            style={{
                                ...(isHexColor ? customColorStyle?.text : {}),
                                animation: "fadeInOut 2s ease-in-out infinite",
                            }}
                        >
                            {message}
                        </p>
                        <style jsx>{`
              @keyframes fadeInOut {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
              }
            `}</style>
                    </div>
                )}
            </div>
        </div>
    )
}
