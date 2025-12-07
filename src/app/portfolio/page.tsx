import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CardColumn from '@/components/shared/card-column';

export const revalidate = 60;

async function getPortfolioProjects() {
    const projects = await prisma.post.findMany({
        where: {
            type: 'PORTFOLIO',
            published: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return projects;
}

export default async function PortfolioPage() {
    const projects = await getPortfolioProjects();

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Portfolio</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    projects.map((project) => (
                        <Link key={project.id} href={`/portfolio/${project.slug}`} className="block group h-full">
                            <CardColumn className="relative overflow-hidden transition-all hover:shadow-md p-0 gap-0 h-full">
                                {project.coverImage ? (
                                    <div className="aspect-video w-full overflow-hidden bg-muted">
                                        <img
                                            src={project.coverImage}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                ) : (
                                    <div className="aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                                <div className="p-4 flex flex-col grow">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:underline">{project.title}</h3>
                                    <div className="line-clamp-2 text-muted-foreground text-sm mb-4 grow" dangerouslySetInnerHTML={{ __html: project.content }} />
                                    <span
                                        className="inline-flex items-center text-sm font-medium text-primary group-hover:underline"
                                    >
                                        View Project
                                    </span>
                                </div>
                            </CardColumn>
                        </Link>
                    ))
                }
                {
                    projects.length === 0 && (
                        <p className="text-muted-foreground col-span-full">No projects found.</p>
                    )
                }
            </div >
        </div >
    );
}
