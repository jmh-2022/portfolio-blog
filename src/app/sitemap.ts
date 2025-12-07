import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://10005.kr';

    // Get all published posts
    const posts = await prisma.post.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true, type: true },
    });

    const blogPosts = posts
        .filter((post) => post.type === 'BLOG')
        .map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));

    const portfolioProjects = posts
        .filter((post) => post.type === 'PORTFOLIO')
        .map((post) => ({
            url: `${baseUrl}/portfolio/${post.slug}`,
            lastModified: post.updatedAt,
            changeFrequency: 'monthly' as const,
            priority: 0.9,
        }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/portfolio`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...blogPosts,
        ...portfolioProjects,
    ];
}
