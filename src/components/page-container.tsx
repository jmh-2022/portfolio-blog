import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function PageContainer({ children, className, ...props }: PageContainerProps) {
    return (
        <div
            className={cn(
                "container mx-auto px-4 py-10 max-w-5xl",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
