'use client';

import { Trash } from 'lucide-react';
import { useModalAction } from '@/context/modal-context';
import { deletePost } from '@/app/actions';

export function DeletePostButton({ id }: { id: string }) {
    const { openModal } = useModalAction();

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        openModal({
            title: 'Delete Post',
            description: 'Are you sure you want to delete this post? This action cannot be undone.',
            variant: 'destructive',
            confirmText: 'Delete',
            onConfirm: async () => {
                await deletePost(id);
            },
        });
    };

    return (
        <button
            onClick={handleDelete}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-destructive hover:text-destructive-foreground"
        >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
        </button>
    );
}
