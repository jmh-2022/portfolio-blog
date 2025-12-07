import 'dotenv/config';
import { prisma } from './src/lib/prisma';

async function main() {
    const posts = await prisma.post.findMany();
    console.log('All Posts:');
    posts.forEach(p => {
        console.log(`Title: ${p.title}, Slug: ${p.slug}, Type: ${p.type}, Published: ${p.published}`);
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
