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

    const description = post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''); // Strip HTML tags
    const defaultImage = '/images/og-default.png'; // Fallback image if you have one, or use site logo
    const ogImage = post.coverImage || defaultImage;

    return {
        title: post.title,
        description: description,
        alternates: {
            canonical: `https://10005.kr/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: description,
            type: 'article',
            publishedTime: post.createdAt.toISOString(),
            url: `https://10005.kr/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: description,
            images: [ogImage],
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.createdAt.toISOString(),
        dateModified: post.updatedAt.toISOString(),
        description: post.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
        image: post.coverImage ? [post.coverImage] : [],
        url: `https://10005.kr/blog/${post.slug}`,
        author: {
            '@type': 'Person',
            name: 'JMH', // Or fetch from user profile if available
        },
    };

    return (
        <div className="container mx-auto py-10 max-w-3xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
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
