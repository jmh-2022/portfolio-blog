import { prisma } from './prisma';
import { PostType } from '../app/generated/prisma/client';

export async function getRecentPosts(type: PostType, limit: number = 3) {
    const posts = await prisma.post.findMany({
        where: {
            type,
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: limit,
    });
    return posts;
}
