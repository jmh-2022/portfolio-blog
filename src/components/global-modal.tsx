'use client';

import { useModalState, useModalAction } from '@/context/modal-context';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GlobalModal() {
    const { isOpen, config } = useModalState();
    const { closeModal } = useModalAction();
    const [isVisible, setIsVisible] = useState(false);

    // Handle animation state
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const isDestructive = config?.variant === 'destructive';

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeModal}
            />

            {/* Modal Content */}
            <div className={`relative w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 text-left shadow-xl transition-all duration-300 sm:my-8 sm:w-full sm:max-w-lg ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <button onClick={closeModal} className="p-1">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>

                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                        <h3 className="text-lg font-semibold leading-6 tracking-tight text-foreground">
                            {config?.title}
                        </h3>
                        {config?.description && (
                            <div className="mt-2">
                                <p className="text-sm text-muted-foreground">
                                    {config.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
                    <button
                        type="button"
                        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto ${isDestructive
                            ? 'bg-red-600 hover:bg-red-500'
                            : 'bg-primary hover:bg-primary/90'
                            }`}
                        onClick={async () => {
                            if (config?.onConfirm) {
                                await config.onConfirm();
                            }
                            closeModal();
                        }}
                    >
                        {config?.confirmText || 'Confirm'}
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-background px-3 py-2 text-sm font-semibold text-foreground ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:ring-gray-700 dark:hover:bg-gray-800 sm:mt-0 sm:w-auto"
                        onClick={closeModal}
                    >
                        {config?.cancelText || 'Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}
