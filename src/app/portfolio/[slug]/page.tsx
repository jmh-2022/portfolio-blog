import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
    return {
        title: project.title,
        description: project.content.substring(0, 160),
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

    return (
        <div className="container mx-auto py-10 max-w-4xl">
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
