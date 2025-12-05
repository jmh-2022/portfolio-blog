import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = 'admin@example.com';
    const password = 'adminpassword'; // Change this in production!
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            email,
            name: 'Admin',
            password: hashedPassword,
        },
    });

    console.log({ user });

    // Seed Blog Posts
    await prisma.post.createMany({
        data: [
            {
                title: 'Getting Started with Next.js 15',
                slug: 'getting-started-nextjs-15',
                content: '<p>Next.js 15 introduces amazing new features like Turbopack and improved Server Actions. It makes building full-stack React applications faster and easier than ever.</p>',
                type: 'BLOG',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
            },
            {
                title: 'Why I Chose PostgreSQL',
                slug: 'why-postgresql',
                content: '<p>PostgreSQL is a powerful, open source object-relational database system. It has earned a strong reputation for reliability, feature robustness, and performance.</p>',
                type: 'BLOG',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=2021&auto=format&fit=crop',
            },
            {
                title: 'My Development Setup',
                slug: 'my-dev-setup',
                content: '<p>I use VS Code with a dark theme, a mechanical keyboard, and a lot of coffee. Productivity is key!</p>',
                type: 'BLOG',
                published: true,
            }
        ],
        skipDuplicates: true,
    });

    // Seed Portfolio Projects
    await prisma.post.createMany({
        data: [
            {
                title: 'E-commerce Dashboard',
                slug: 'ecommerce-dashboard',
                content: '<p>A comprehensive dashboard for managing online stores. Built with React, Tailwind CSS, and Recharts.</p>',
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
            },
            {
                title: 'Travel Booking App',
                slug: 'travel-booking-app',
                content: '<p>Mobile-first application for booking flights and hotels. Features real-time availability and secure payments.</p>',
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
            },
            {
                title: 'AI Image Generator',
                slug: 'ai-image-generator',
                content: '<p>An application that uses generative AI to create unique images based on text prompts.</p>',
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop',
            }
        ],
        skipDuplicates: true,
    });

    console.log('Sample data seeded!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
