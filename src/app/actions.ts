'use server';

import { prisma } from '@/lib/prisma';
import { PostType } from './generated/prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export async function createPost(formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const type = formData.get('type') as PostType;
    const published = formData.get('published') === 'on';
    const coverImage = formData.get('coverImage') as string;
    const images = JSON.parse(formData.get('images') as string || '[]');

    await prisma.post.create({
        data: {
            title,
            slug,
            content,
            type,
            published,
            coverImage,
            images,
        },
    });

    revalidatePath('/admin');
    revalidatePath('/blog');
    revalidatePath('/portfolio');
    redirect('/admin');
}

export async function updatePost(id: string, formData: FormData) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const content = formData.get('content') as string;
    const type = formData.get('type') as PostType;
    const published = formData.get('published') === 'on';
    const coverImage = formData.get('coverImage') as string;
    const images = JSON.parse(formData.get('images') as string || '[]');

    await prisma.post.update({
        where: { id },
        data: {
            title,
            slug,
            content,
            type,
            published,
            coverImage,
            images,
        },
    });

    revalidatePath('/admin');
    revalidatePath('/blog');
    revalidatePath('/portfolio');
    redirect('/admin');
}

export async function deletePost(id: string) {
    const session = await auth();
    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    await prisma.post.delete({
        where: { id },
    });

    revalidatePath('/admin');
    revalidatePath('/blog');
    revalidatePath('/portfolio');
}

export async function getPost(id: string) {
    const post = await prisma.post.findUnique({
        where: { id },
    });
    return post;
}

export async function getPosts() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
    });
    return posts;
}
