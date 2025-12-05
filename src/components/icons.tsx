import React from "react"

export function DumplingIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" className="hidden" />
            <path d="M2 15c0-2.8 2.2-5 5-5h10c2.8 0 5 2.2 5 5v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-2z" />
            <path d="M12 10V5" />
            <path d="M8 10V7" />
            <path d="M16 10V7" />
            <path d="M2 15s1-2 4-2 4 2 6 2 3-2 6-2 4 2 4 2" fill="none" />
        </svg>
    )
}
