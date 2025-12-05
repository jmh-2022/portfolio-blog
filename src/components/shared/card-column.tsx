import React from 'react';

export default function CardColumn({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <section className={`flex flex-col py-4 px-3 gap-1 bg-gray-50 dark:bg-gray-800 text-card-foreground rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className || ''}`}>
            {children}
        </section>
    );
}
