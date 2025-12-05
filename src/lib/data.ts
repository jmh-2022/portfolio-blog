import { PrismaClient, PostType } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
