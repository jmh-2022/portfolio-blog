'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { createPost, updatePost, getPost } from '@/app/actions';
import dynamic from 'next/dynamic';
import SolidButton from '@/components/shared/solid-button';

const CustomEditor = dynamic(() => import('@/components/custom-editor'), { ssr: false });
import { PageContainer } from '@/components/page-container';

export default function PostEditor() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const isNew = id === 'new';
    const [loading, setLoading] = useState(!isNew);
    const [post, setPost] = useState<any>(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id && !isNew) {
            getPost(id).then((data) => {
                if (data) {
                    setPost(data);
                    setContent(data.content);
                }
                setLoading(false);
            });
        } else if (isNew) {
            setLoading(false);
        }
    }, [isNew, id]);

    async function handleSubmit(formData: FormData) {
        formData.append('content', content);

        // Extract image URLs from content
        const images: string[] = [];
        const regex = /<img[^>]+src="([^">]+)"/g;
        let match;
        while ((match = regex.exec(content)) !== null) {
            images.push(match[1]);
        }
        formData.append('images', JSON.stringify(images));

        if (isNew) {
            await createPost(formData);
        } else {
            await updatePost(id, formData);
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold mb-8">{isNew ? 'New Post' : 'Edit Post'}</h1>
            <form action={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="title" className="text-sm font-medium">Title</label>
                        <input
                            id="title"
                            name="title"
                            defaultValue={post?.title}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="slug" className="text-sm font-medium">Slug</label>
                        <input
                            id="slug"
                            name="slug"
                            defaultValue={post?.slug}
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="type" className="text-sm font-medium">Type</label>
                        <select
                            id="type"
                            name="type"
                            defaultValue={post?.type || 'BLOG'}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="BLOG">Blog</option>
                            <option value="PORTFOLIO">Portfolio</option>
                        </select>
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="coverImage" className="text-sm font-medium">Cover Image URL</label>
                        <input
                            id="coverImage"
                            name="coverImage"
                            defaultValue={post?.coverImage}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="published"
                            name="published"
                            defaultChecked={post?.published}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="published" className="text-sm font-medium">Published</label>
                    </div>
                    <div className="grid gap-2">
                        <label className="text-sm font-medium">Content</label>
                        <CustomEditor content={content} handleChangeEditorData={setContent} />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin"
                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        Cancel
                    </Link>
                    <SolidButton type="submit">
                        Save
                    </SolidButton>
                </div>
            </form>
        </PageContainer>
    );
}
