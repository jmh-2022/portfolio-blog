import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import CardColumn from '@/components/shared/card-column';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const revalidate = 60; // Revalidate every 60 seconds

async function getBlogPosts() {
    const posts = await prisma.post.findMany({
        where: {
            type: 'BLOG',
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return posts;
}

export default async function BlogPage() {
    const posts = await getBlogPosts();

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Blog</h1>
            <div className="grid gap-8">
                {posts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="block group">
                        <CardColumn className="gap-4 p-6 h-full transition-colors hover:bg-muted/50">
                            <h2 className="text-2xl font-semibold group-hover:underline">
                                {post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm">
                                {post.createdAt.toISOString().split('T')[0]}
                            </p>
                            {post.coverImage && (
                                <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded-md" />
                            )}
                            <div className="line-clamp-3 text-muted-foreground" dangerouslySetInnerHTML={{ __html: post.content }} />
                            <span className="text-primary font-medium group-hover:underline">
                                Read more
                            </span>
                        </CardColumn>
                    </Link>
                ))}
                {posts.length === 0 && (
                    <p className="text-muted-foreground">No posts found.</p>
                )}
            </div>
        </div>
    );
}
