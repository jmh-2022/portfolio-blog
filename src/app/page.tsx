import Link from "next/link"
import { ArrowRight, Github, Mail } from "lucide-react"
import { getRecentPosts } from "@/lib/data"
import { TypographyH1, TypographyLead, TypographyH3 } from "@/components/ui/typography"


export default async function Home() {
  const recentPosts = await getRecentPosts('BLOG', 3);
  const recentProjects = await getRecentPosts('PORTFOLIO', 4);

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden text-[#212529] dark:text-[#E0E0E0]">
      {/* Top Area: Split 50:50 */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">

        {/* Left: Intro (Area 1: Main - White / Very Dark Gray) */}
        <section className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 bg-[#FFFFFF] dark:bg-[#121212] text-center">
          <div className="max-w-xl mx-auto space-y-6 flex flex-col items-center">
            <TypographyH1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#212529] dark:text-[#E0E0E0]">
              <span className="text-[#6C757D] dark:text-[#A0A0A0] block text-xl md:text-2xl mb-2 font-medium">안녕하세요, 흑만두의 개인블로그입니다.</span>


            </TypographyH1>

            <TypographyLead className="text-base md:text-lg text-[#6C757D] dark:text-[#A0A0A0] leading-relaxed">
              7년차 풀스택 개발자.<br />
              개발, 금융, 여행, 책, 일상을 기록합니다.
            </TypographyLead>

            <div className="flex gap-3 pt-2 justify-center">
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                Portfolio
              </Link>
              <Link href="/blog" className="inline-flex items-center justify-center rounded-full border border-input/20 bg-background/50 px-6 py-2.5 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors text-[#212529] dark:text-[#E0E0E0]">
                Blog
              </Link>
            </div>

            {/* Simple Social Links in Intro Area */}
            <div className="flex gap-4 text-[#6C757D] dark:text-[#A0A0A0] pt-4 justify-center">
              <Link href="https://github.com/jmh-2022" target="_blank" className="hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="mailto:jmh3360@kakao.com" className="hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Right: Projects (Area 2: Middle - Ghost White / Dark Gray) */}
        <section className="flex-1 p-6 lg:p-8 bg-[#F8F9FA] dark:bg-[#1E1E1E] flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <h2 className="text-lg font-bold tracking-tight text-[#212529] dark:text-[#E0E0E0]">Recent Projects</h2>
            <Link href="/portfolio" className="text-xs font-medium text-[#6C757D] dark:text-[#A0A0A0] hover:text-primary flex items-center gap-1">
              More <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
            {recentProjects.map((project) => (
              <Link key={project.id} href={`/portfolio/${project.slug}`} className="group relative block h-full overflow-hidden rounded-xl bg-muted/20 border border-border/50">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end opacity-90 transition-opacity group-hover:opacity-100">
                  <h3 className="text-white font-medium text-sm line-clamp-1">{project.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom: Blog Posts (Area 3: Light Gray / Medium Gray) */}
      <section className="h-[25vh] min-h-[180px] bg-[#E9ECEF] dark:bg-[#2C2C2C] p-6 lg:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-lg font-bold tracking-tight text-[#212529] dark:text-[#E0E0E0]">Latest from Blog</h2>
          <Link href="/blog" className="text-xs font-medium text-[#6C757D] dark:text-[#A0A0A0] hover:text-primary flex items-center gap-1">
            Read all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
          {recentPosts.slice(0, 3).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col justify-between h-full p-4 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                  <span className="text-xs text-[#6C757D] dark:text-[#A0A0A0]">{post.createdAt.toISOString().split('T')[0]}</span>
                </div>
                <TypographyH3 className="text-base leading-snug font-semibold group-hover:text-primary transition-colors line-clamp-1 mb-1 text-[#212529] dark:text-[#E0E0E0]">
                  {post.title}
                </TypographyH3>
                <p className="text-xs text-[#6C757D] dark:text-[#A0A0A0] line-clamp-2">
                  {post.content.replace(/<[^>]*>?/gm, "")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}



