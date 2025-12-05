import { cn } from "@/lib/utils"
import React from "react"

export function TypographyH1({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1
            className={cn(
                "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
                className
            )}
            {...props}
        >
            {children}
        </h1>
    )
}

export function TypographyH2({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2
            className={cn(
                "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </h2>
    )
}

export function TypographyH3({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                "scroll-m-20 text-2xl font-semibold tracking-tight",
                className
            )}
            {...props}
        >
            {children}
        </h3>
    )
}

export function TypographyP({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
            {...props}
        >
            {children}
        </p>
    )
}

export function TypographyLead({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-xl text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    )
}

export function TypographyMuted({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn("text-sm text-muted-foreground", className)}
            {...props}
        >
            {children}
        </p>
    )
}
