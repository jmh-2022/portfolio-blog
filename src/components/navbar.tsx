"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { DumplingIcon } from "@/components/icons"
import { Session } from "next-auth"

export function Navbar({ session }: { session: Session | null }) {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false)

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight hover:text-primary/80 transition-colors">
                            <DumplingIcon className="h-8 w-8 text-black dark:text-white" />
                            <span>흑만두</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Portfolio
                        </Link>
                        <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Blog
                        </Link>
                        {session?.user && (
                            <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Admin
                            </Link>
                        )}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="relative rounded-full p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="relative rounded-full p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="rounded-md p-2 hover:bg-accent hover:text-accent-foreground"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="absolute top-16 left-0 w-full border-b bg-background/95 backdrop-blur-md md:hidden shadow-lg animate-in slide-in-from-top-5">
                        <div className="container mx-auto px-4 py-6 flex flex-col gap-6">
                            <Link
                                href="/portfolio"
                                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Portfolio
                            </Link>
                            <Link
                                href="/blog"
                                className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            {session?.user && (
                                <Link
                                    href="/admin"
                                    className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Admin
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
