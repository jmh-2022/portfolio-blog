import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

async function getPost(slug: string) {
    const post = await prisma.post.findUnique({
        where: {
            slug,
            published: true,
        },
    });
    return post;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);
    if (!post) return { title: 'Post Not Found' };
    return {
        title: post.title,
        description: post.content.substring(0, 160), // Simple truncation for description
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <article className="prose dark:prose-invert max-w-none">
                <h1 className="mb-4">{post.title}</h1>
                <div className="text-muted-foreground text-sm mb-8">
                    {post.createdAt.toLocaleDateString()}
                </div>
                {post.coverImage && (
                    <img src={post.coverImage} alt={post.title} className="w-full h-auto rounded-lg mb-8" />
                )}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
        </div>
    );
}
