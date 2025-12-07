import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 60;

async function getProject(slug: string) {
    const project = await prisma.post.findUnique({
        where: {
            slug,
            published: true,
            type: 'PORTFOLIO', // Ensure we only fetch portfolios
        },
    });
    return project;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);
    if (!project) return { title: 'Project Not Found' };

    const description = project.content.substring(0, 160).replace(/<[^>]*>?/gm, '');
    const defaultImage = '/images/og-default.png';
    const ogImage = project.coverImage || defaultImage;

    return {
        title: project.title,
        description: description,
        alternates: {
            canonical: `https://10005.kr/portfolio/${project.slug}`,
        },
        openGraph: {
            title: project.title,
            description: description,
            type: 'article', // or 'website' / 'profile' depending on content, but article/website is common
            url: `https://10005.kr/portfolio/${project.slug}`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: description,
            images: [ogImage],
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    console.log('Requested slug:', slug);
    const decodedSlug = decodeURIComponent(slug);
    console.log('Decoded slug:', decodedSlug);

    // Try both raw and decoded just in case
    let project = await getProject(slug);
    if (!project && slug !== decodedSlug) {
        console.log('Trying decoded slug...');
        project = await getProject(decodedSlug);
    }

    if (!project) {
        console.log('Project not found for slug:', slug);
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork', // or 'SoftwareApplication' / 'WebSite' depending on portfolio type
        headline: project.title,
        datePublished: project.createdAt.toISOString(),
        dateModified: project.updatedAt.toISOString(),
        description: project.content.substring(0, 160).replace(/<[^>]*>?/gm, ''),
        image: project.coverImage ? [project.coverImage] : [],
        url: `https://10005.kr/portfolio/${project.slug}`,
        author: {
            '@type': 'Person',
            name: 'JMH',
        },
    };

    return (
        <div className="container mx-auto py-10 max-w-4xl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <article className="prose dark:prose-invert max-w-none">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                    <div className="text-muted-foreground">
                        {project.createdAt.toLocaleDateString()}
                    </div>
                </div>

                {project.coverImage && (
                    <div className="aspect-video w-full overflow-hidden rounded-xl mb-10 border bg-muted">
                        <img
                            src={project.coverImage}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div dangerouslySetInnerHTML={{ __html: project.content }} />
            </article>
        </div>
    );
}
