'use client';

import { useRouter } from 'next/navigation';
import { DeletePostButton } from '@/components/delete-post-button';

type Post = {
    id: string;
    title: string;
    type: string;
    published: boolean;
    createdAt: Date;
};

export function AdminPostRow({ post }: { post: Post }) {
    const router = useRouter();

    return (
        <tr
            onClick={() => router.push(`/admin/posts/${post.id}`)}
            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted cursor-pointer"
        >
            <td className="p-4 align-middle font-medium">{post.title}</td>
            <td className="p-4 align-middle">{post.type}</td>
            <td className="p-4 align-middle">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${post.published ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                    {post.published ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="p-4 align-middle">{post.createdAt.toISOString().split('T')[0]}</td>
            <td className="p-4 align-middle text-right">
                <div className="flex items-center justify-end gap-2">
                    <DeletePostButton id={post.id} />
                </div>
            </td>
        </tr>
    );
}
