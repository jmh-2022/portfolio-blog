import 'dotenv/config';
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

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
                title: 'Ebull - 금융 서비스 플랫폼',
                slug: 'ebull',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>다양한 금융 상품을 비교하고 가입할 수 있는 <strong>종합 금융 서비스 플랫폼</strong>입니다. SEO(검색 엔진 최적화)와 초기 로딩 속도에 중점을 두어 개발되었습니다.</p>

                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>SEO 최적화:</strong> Next.js의 SSR(Server Side Rendering)을 적극 활용하여 검색 엔진 노출 순위 상위권 달성</li>
                            <li><strong>성능 튜닝:</strong> Core Web Vitals 지표 개선을 위한 이미지 최적화 및 번들 사이즈 감축</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>압도적인 SEO 성능:</strong> 모든 상품 페이지에 동적 메타태그를 적용하여 검색 유입이 200% 증가했습니다.</li>
                            <li><strong>컴포넌트 주도 개발:</strong> 재사용 가능한 UI 컴포넌트(Atomic Design)를 구축하여 개발 속도를 가속화했습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>테스트 코드 부재:</strong> 빠른 런칭을 위해 단위 테스트 작성이 미흡했습니다. Jest 도입을 계획 중입니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (Dynamic Metadata)</h3>
                        <p>Next.js 14의 generateMetadata를 활용해 검색 엔진에 최적화된 정보를 제공합니다.</p>
                        <pre><code class="language-typescript">
// app/products/[id]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await fetchProduct(params.id);
  
  return {
    title: \`\${product.name} - Ebull Financial\`,
    description: product.summary,
    openGraph: {
      images: [product.thumbnailUrl],
    },
  };
}
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>Next.js 14, NextUI, React Query, TypeScript</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop',
            },
            {
                title: 'HMS Pension Front - 연금 관리 포털',
                slug: 'hms-pension-front',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>기업 및 개인 고객이 자신의 퇴직 연금을 조회하고 관리할 수 있는 <strong>B2B/B2C 연금 관리 포털</strong>입니다. 복잡한 연금 데이터를 사용자가 쉽고 직관적으로 조회할 수 있도록 돕는 웹 서비스입니다.</p>

                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>프론트엔드 개발:</strong> Next.js 기반의 전체 화면 UI 구성 및 비즈니스 로직 구현</li>
                            <li><strong>데이터 시각화:</strong> 연금 자산 추이 및 수익률 시뮬레이션을 위한 인터랙티브 차트 구현</li>
                            <li><strong>데이터 파싱:</strong> 복잡한 연금 계산 로직 및 HTML 데이터를 <strong>HTMLParser2</strong>로 안전하게 처리</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>App Router 아키텍처:</strong> 레이아웃(Lnb, Header)을 중첩 구조로 설계하여 불필요한 리렌더링을 방지했습니다.</li>
                            <li><strong>보안성 강화:</strong> 연금 데이터라는 민감 정보를 다루기 위해 클라이언트 단에서의 데이터 조작을 원천 차단했습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>복잡한 비즈니스 로직:</strong> 프론트엔드에 일부 남아있는 계산 로직을 백엔드로 완전히 이관하는 리팩토링이 필요합니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (Secure Data Fetching)</h3>
                        <p>서버 컴포넌트(RSC)를 활용하여 클라이언트에 민감한 API 키를 노출하지 않고 데이터를 조회합니다.</p>
                        <pre><code class="language-typescript">
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const pensionData = await fetchPensionData(); // 서버 내부 통신

  return (
    <section>
      <h1>나의 예상 퇴직금</h1>
      <PensionChart data={pensionData} /> {/* 필요한 데이터만 전달 */}
    </section>
  );
}
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>Next.js 14 (App Router), NextUI, HTMLParser2</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop',
            },
            {
                title: 'HMS Pension Admin - 사내 관리자 시스템',
                slug: 'hms-pension-admin',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>연금 데이터 관리, 사용자 권한 설정, 공지사항 작성 등을 수행하는 <strong>사내 백오피스(Admin) 시스템</strong>입니다. 업무 효율성을 높이기 위한 다양한 편의 기능을 탑재했습니다.</p>

                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>백오피스 구축:</strong> 복잡한 데이터 테이블 및 관리자 기능 전체 구현</li>
                            <li><strong>에디터 연동:</strong> 공지사항 및 약관 관리를 위한 위지윅(WYSIWYG) 에디터 연동</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>강력한 폼 핸들링:</strong> 수십 개의 입력 필드가 있는 복잡한 신청서를 React Hook Form으로 제어하여 렌더링 성능을 최적화했습니다.</li>
                            <li><strong>생산성 향상:</strong> 엑셀 다운로드, 일괄 처리 기능을 통해 실무자의 업무 시간을 50% 단축시켰습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>디자인 시스템:</strong> 내부 시스템이라 UI 편의성이 다소 부족합니다. 대시보드 UI 개선을 계획 중입니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (Reusable Form)</h3>
                        <p>제어 컴포넌트(Controller)를 활용하여 유효성 검사가 포함된 재사용 가능한 Input 컴포넌트입니다.</p>
                        <pre><code class="language-tsx">
// components/FormInput.tsx
export const FormInput = ({ control, name, rules }) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input {...field} className={error ? 'border-red-500' : ''} />
          {error && <span>{error.message}</span>}
        </div>
      )}
    />
  );
};
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>Next.js 14, CKEditor 5, React Hook Form, TanStack Table</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop',
            },
            {
                title: 'Routine On (루틴온) - 습관 형성 플랫폼',
                slug: 'routine-on',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>웹(Web)과 앱(App)을 아우르는 <strong>올인원 루틴 관리 플랫폼</strong>입니다. 사용자가 자신만의 루틴을 설정하고 실천할 수 있도록 돕는 서비스로, 직관적인 대시보드와 실시간 동기화 기능을 제공합니다.</p>
                        
                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>기획 및 설계:</strong> 서비스 전체 아키텍처 설계 및 DB 모델링</li>
                            <li><strong>프론트엔드/모바일:</strong> Next.js 웹 대시보드 및 React Native 모바일 앱 동시 개발</li>
                            <li><strong>백엔드 연동:</strong> API 통신 규격 설계 및 NextAuth를 활용한 통합 인증 구현</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>Monorepo 효율성:</strong> 웹과 앱의 비즈니스 로직과 타입(Type)을 90% 이상 공유하여 유지보수 비용을 획기적으로 절감했습니다.</li>
                            <li><strong>심리스한 동기화:</strong> 웹에서 루틴을 수정하면 앱에 즉시 반영되는 실시간성을 확보했습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>오프라인 모드:</strong> 네트워크가 없는 환경에서도 루틴 체크가 가능하도록 로컬 DB(SQLite) 도입을 고려 중입니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (Recoil State Management)</h3>
                        <p>웹과 앱에서 공통으로 사용하는 루틴 필터링 로직을 Selector로 구현하여 중복을 제거했습니다.</p>
                        <pre><code class="language-typescript">
// routineState.ts (Common Logic)
export const filteredRoutineListState = selector({
  key: 'filteredRoutineListState',
  get: ({get}) => {
    const filter = get(routineFilterState);
    const list = get(routineListState);

    switch (filter) {
      case 'COMPLETED':
        return list.filter((item) => item.isCompleted);
      case 'TODAY':
        return list.filter((item) => isToday(item.date));
      default:
        return list;
    }
  },
});
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>Next.js 14, React Native, Recoil, React Query, NextAuth, Tailwind CSS</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop',
            },
            {
                title: '학연 (Hakyeon) - 교육 커뮤니티 앱',
                slug: 'hakyeon',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>학원 및 교육 기관 종사자들을 위한 <strong>폐쇄형 커뮤니티 모바일 애플리케이션</strong>입니다. 정보 공유, 구인구직, 실시간 소통 기능을 제공하여 업계 종사자들의 네트워킹을 활성화했습니다.</p>

                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>React Native 개발:</strong> 안드로이드/iOS 하이브리드 앱 전체 구현</li>
                            <li><strong>UX 최적화:</strong> 모바일 환경에 최적화된 제스처 네비게이션 및 부드러운 애니메이션 구현</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>안정적인 토큰 관리:</strong> Axios Interceptor를 통한 완벽한 토큰 갱신 로직으로, 사용자가 로그아웃 경험 없이 앱을 지속적으로 사용할 수 있습니다.</li>
                            <li><strong>부드러운 스크롤:</strong> 대량의 피드 데이터도 끊김 없이 보여주는 최적화된 리스트 뷰를 구현했습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>채팅 기능 고도화:</strong> 현재 폴링(Polling) 방식의 알림을 WebSocket으로 전환하여 실시간성을 강화할 예정입니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (Axios Interceptor)</h3>
                        <p>토큰 만료 시 자동으로 Refresh Token을 사용하여 재발급받는 보안 로직입니다.</p>
                        <pre><code class="language-typescript">
// api/client.ts
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken(); // 토큰 갱신
      client.defaults.headers.common['Authorization'] = \`Bearer \${newToken}\`;
      return client(originalRequest);
    }
    return Promise.reject(error);
  }
);
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>React Native 0.72, Recoil, Axios, React Native Reanimated</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
            },
            {
                title: 'Investment Routine - 핀테크 대시보드',
                slug: 'investment-routine',
                content: `
                    <div>
                        <h3>🚀 프로젝트 개요</h3>
                        <p>개인 투자자들의 투자 습관을 분석하고 자산을 시각화해주는 <strong>핀테크 대시보드 서비스</strong>입니다. 복잡한 금융 데이터를 직관적인 차트와 그래프로 제공합니다.</p>

                        <h3>👨‍💻 담당 역할 및 기여도 (100%)</h3>
                        <ul>
                            <li><strong>프론트엔드 개발:</strong> Next.js 기반의 반응형 웹 애플리케이션 구현</li>
                            <li><strong>데이터 시각화:</strong> 다양한 차트 라이브러리 커스터마이징 및 인터랙티브 UI 개발</li>
                        </ul>

                        <h3>🏆 프로젝트 강점 (Pros)</h3>
                        <ul>
                            <li><strong>데이터 시각화:</strong> Recharts를 커스터마이징하여 금융 데이터를 한눈에 파악할 수 있는 미려한 차트를 제공합니다.</li>
                            <li><strong>반응형 디자인:</strong> 태블릿, 모바일 등 다양한 뷰포트에서도 깨지지 않는 완벽한 레이아웃을 구현했습니다.</li>
                        </ul>

                        <h3>📈 보완할 점 (Improvements)</h3>
                        <ul>
                            <li><strong>초기 로딩 속도:</strong> 차트 라이브러리의 번들 사이즈가 커서, Dynamic Import를 통해 초기 로딩 속도를 더 개선할 여지가 있습니다.</li>
                        </ul>

                        <h3>💻 핵심 소스 (React Query Hook)</h3>
                        <p>투자 데이터를 효율적으로 캐싱하고, 백그라운드에서 주기적으로 갱신하는 커스텀 훅입니다.</p>
                        <pre><code class="language-typescript">
// hooks/usePortfolio.ts
export const usePortfolioData = (userId: string) => {
  return useQuery({
    queryKey: ['portfolio', userId],
    queryFn: () => fetchPortfolio(userId),
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    select: (data) => ({
      totalValue: data.assets.reduce((acc, cur) => acc + cur.value, 0),
      chartData: formatChartData(data.history),
    }),
  });
};
                        </code></pre>

                        <h3>💻 사용 기술</h3>
                        <p>Next.js 14, NextUI, React Query, Recoil, Recharts</p>
                    </div>
                `,
                type: 'PORTFOLIO',
                published: true,
                coverImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop',
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
