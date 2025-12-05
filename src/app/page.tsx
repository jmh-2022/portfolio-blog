import Link from "next/link"
import { ArrowRight, Github, Mail, Twitter } from "lucide-react"
import { getRecentPosts } from "@/lib/data"
import { TypographyH1, TypographyH2, TypographyH3, TypographyLead, TypographyMuted } from "@/components/ui/typography"
import CardColumn from '@/components/shared/card-column';

export default async function Home() {
  const recentPosts = await getRecentPosts('BLOG', 3);
  const recentProjects = await getRecentPosts('PORTFOLIO', 3);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      <section className="flex-1 flex flex-col items-center justify-center space-y-6 py-16 md:py-24 lg:py-32 px-4 md:px-6 text-center bg-gradient-to-b from-background to-muted/20">
        <div className="space-y-4 max-w-3xl">
          <TypographyH1 className="pb-2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-muted-foreground font-bold leading-relaxed">
            안녕하세요, <span className="text-foreground font-black">흑만두</span>의 <br className="hidden md:inline" />개인 블로그입니다.
          </TypographyH1>
          <div className="h-1 w-20 md:w-24 bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto my-6 md:my-8 rounded-full" />
          <TypographyLead className="mx-auto max-w-[800px] text-base md:text-xl whitespace-pre-line leading-relaxed px-2">
            7년차 풀스택 개발자로서 개발, 금융, 여행, 책, 그리고 일상을 공유합니다.

            새로운 기술을 탐구하고 엔지니어링의 깊이를 소중히 여깁니다.
            단순히 코드를 작성하는 것을 넘어, 문제를 해결하며 얻은 통찰과 일상 속 작은 영감들을 기록합니다.
            이곳이 지식을 나누고 함께 성장하는, 잠시 쉬어갈 수 있는 따뜻한 공간이 되기를 바랍니다.
          </TypographyLead>
        </div>

      </section>

      <section className="container mx-auto py-12 px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <TypographyH2 className="border-b-0">최근 프로젝트</TypographyH2>
          <Link href="/portfolio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentProjects.map((project) => (
            <Link key={project.id} href={`/portfolio/${project.slug}`} className="block group h-full">
              <CardColumn className="relative overflow-hidden p-0 gap-0 h-full">
                {project.coverImage ? (
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-muted flex items-center justify-center text-muted-foreground">
                    No Image
                  </div>
                )}
                <div className="p-5">
                  <TypographyH3 className="mb-2 line-clamp-1 text-lg group-hover:text-primary transition-colors">{project.title}</TypographyH3>
                  <span className="sr-only">View Project</span>
                </div>
              </CardColumn>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-12 px-4 md:px-6 bg-muted/30 rounded-3xl my-8">
        <div className="flex items-center justify-between mb-8">
          <TypographyH2 className="border-b-0">최근 게시물</TypographyH2>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block group h-full">
              <CardColumn className="gap-2 p-5 h-full">
                <TypographyH3 className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </TypographyH3>
                <TypographyMuted>
                  {post.createdAt.toISOString().split('T')[0]}
                </TypographyMuted>
                <div className="line-clamp-2 text-muted-foreground text-sm mt-2" dangerouslySetInnerHTML={{ __html: post.content }} />
              </CardColumn>
            </Link>
          ))}
        </div>
      </section>

      <footer className="py-8 flex justify-center gap-8 border-t bg-muted/10">
        <Link href="https://github.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link href="mailto:hello@example.com" className="text-muted-foreground hover:text-foreground transition-colors">
          <Mail className="h-5 w-5" />
          <span className="sr-only">Email</span>
        </Link>
      </footer>
    </div>
  )
}


