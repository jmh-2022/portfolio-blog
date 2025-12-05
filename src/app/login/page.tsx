'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';

export default function LoginPage() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
            <form action={formAction} className="flex flex-col gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Admin Login
                </h1>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="admin@example.com"
                        required
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        id="password"
                        type="password"
                        name="password"
                        required
                        minLength={6}
                    />
                </div>
                <div
                    className="flex h-8 items-end space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                </div>
                <button
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    aria-disabled={isPending}
                >
                    Log in
                </button>
            </form>
        </div>
    );
}
