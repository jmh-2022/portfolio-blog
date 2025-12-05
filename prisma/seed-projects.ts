import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const projects = [
    {
      title: '현대차증권 퇴직연금 관리자 (HMSEC Pension Admin)',
      slug: 'hmsec-pension-admin',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>현대차증권 퇴직연금 플랫폼의 콘텐츠와 데이터를 효율적으로 관리하기 위한 백오피스 시스템입니다. 공지사항, 투자 정보, 팝업 등을 통합 관리할 수 있습니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (Front-end 전체 설계 및 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Editor:</strong> CKEditor 5 (Custom Build)</li>
          <li><strong>State Management:</strong> Recoil, TanStack Query v5</li>
          <li><strong>UI Library:</strong> NextUI, Tailwind CSS</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>커스텀 에디터 통합:</strong> CKEditor 5를 커스터마이징하여 이미지 업로드, 리사이징, 텍스트 서식 적용 등 풍부한 편집 기능을 제공하고, 작성된 콘텐츠의 HTML 구조를 최적화했습니다.</li>
          <li><strong>이미지 처리 파이프라인:</strong> 에디터에 삽입된 이미지의 임시 경로와 실제 업로드 경로를 구분하여 처리하고, 최종 저장 시 사용된 이미지만 선별하여 서버에 전송하는 로직을 구현했습니다.</li>
          <li><strong>통합 관리 대시보드:</strong> 다양한 유형의 게시물(공지, 인사이트, 팝업)을 하나의 시스템에서 일관된 UI로 관리할 수 있도록 컴포넌트를 모듈화했습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>에디터 이미지 업로드 동기화:</strong> CKEditor의 비동기 업로드 어댑터와 React의 상태 관리 간의 타이밍 이슈를 해결하기 위해 <strong>Custom Upload Adapter</strong>를 구현하여 업로드 프로세스를 제어했습니다.</li>
          <li><strong>대용량 콘텐츠 렌더링:</strong> 에디터로 작성된 긴 HTML 콘텐츠를 미리보기 할 때 발생하는 렌더링 성능 저하를 방지하기 위해 <strong>HTML Sanitization</strong>과 <strong>Lazy Loading</strong>을 적용했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: Custom CKEditor Integration</h3>
        <pre><code class="language-typescript">
// CKEditor 5 커스텀 업로드 어댑터 및 플러그인 설정
export default function CustomEditor({ handleChangeEditorData, content }: CustomEditorProps) {
  const customUploadAdapter = (loader: FileLoader) => {
    return {
      upload(): Promise<UploadResponse> {
        return new Promise((resolve, reject) => {
          loader.file.then(async (file) => {
            if (file) {
              const formData = new FormData();
              formData.append('file', file);
              // 서버로 이미지 업로드 후 URL 반환
              const resData = await callFetchPostFileUpload(editorImageUri, formData);
              resolve({ default: resData.data.imageUrl });
            }
          });
        });
      },
    };
  };

  function uploadPlugin(editor: Editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
      return customUploadAdapter(loader);
    };
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={{ ...editorConfig, extraPlugins: [uploadPlugin] }}
      onChange={(event, editor) => handleChangeEditorData?.(editor.getData())}
      data={content}
    />
  );
}
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '현대차증권 퇴직연금 (HMSEC Pension)',
      slug: 'hmsec-pension',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>현대차증권의 퇴직연금 고객을 위한 맞춤형 자산 관리 및 ETF 투자 플랫폼입니다. 복잡한 연금 데이터를 직관적으로 시각화하고, 개인화된 투자 포트폴리오를 제안합니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (Front-end 전체 설계 및 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>State Management:</strong> Recoil, TanStack Query v5</li>
          <li><strong>UI Library:</strong> NextUI, Tailwind CSS</li>
          <li><strong>Visualization:</strong> Recharts</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>ETF 투자 정보 큐레이션:</strong> 수익률, 테마, 배당 등 다양한 기준으로 ETF를 분석하고 추천하는 알고리즘을 프론트엔드 레벨에서 최적화하여 구현했습니다.</li>
          <li><strong>연금 시뮬레이터:</strong> 사용자의 자산 현황과 투자 성향을 기반으로 미래 연금 수령액을 예측하는 시뮬레이터를 Recharts를 활용하여 시각적으로 구현했습니다.</li>
          <li><strong>복합 필터링 시스템:</strong> 다양한 투자 상품을 조건별로 검색하고 비교할 수 있는 고성능 필터링 로직을 Custom Hook으로 추상화하여 재사용성을 높였습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>데이터 필터링 상태 관리:</strong> 정렬(Sort)과 기간(Range) 등 다차원 필터가 조합될 때 발생하는 상태 관리의 복잡성을 <strong>Custom Hook 패턴</strong>으로 캡슐화하여 비즈니스 로직과 UI를 명확히 분리했습니다.</li>
          <li><strong>API 요청 최적화:</strong> 잦은 필터 변경으로 인한 불필요한 네트워크 요청을 방지하기 위해 <strong>Debounce</strong> 처리와 TanStack Query의 <strong>캐싱 전략</strong>을 적극 활용했습니다.</li>
          <li><strong>차트 반응형 이슈:</strong> 모바일과 데스크탑 환경에서 차트의 가독성을 유지하기 위해 <code>ResizeObserver</code>를 활용한 동적 크기 조절 로직을 적용했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: Custom Hook for Data Fetching</h3>
        <pre><code class="language-typescript">
// 필터링 조건(정렬, 기간)에 따른 데이터 페칭과 상태 관리를 캡슐화한 Custom Hook
export function useMainThemeTop5(
  initialSortType: TSortType = 'DESC',
  initialRangeType: TChartSearchRange = 'WEEK_1'
) {
  const [sortTypeCode, setSortTypeCode] = useState<TSortType>(initialSortType);
  const [returnRateRangeTypeCode, setReturnRateRangeTypeCode] =
    useState<TChartSearchRange>(initialRangeType);
  const [themeTop5, setThemeTop5] = useState<TTop5Theme[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 상태 업데이트 로직을 하나의 함수로 추상화
  const setSearchFilter = (updater) => {
    const next = updater({ sortTypeCode, returnRateRangeTypeCode });
    setSortTypeCode(next.sortTypeCode);
    setReturnRateRangeTypeCode(next.returnRateRangeTypeCode);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getMainThemeTop5(sortTypeCode, returnRateRangeTypeCode);
      setThemeTop5(data.data);
    } finally {
      setIsLoading(false);
    }
  }, [sortTypeCode, returnRateRangeTypeCode]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    themeTop5,
    isLoading,
    sortTypeCode,
    returnRateRangeTypeCode,
    setSearchFilter,
  };
}
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '이불 (Ebull) - ETF 분석 플랫폼',
      slug: 'ebull-platform',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>복잡한 ETF 데이터를 직관적으로 분석하고 비교할 수 있는 금융 플랫폼입니다. 기존 차트 라이브러리의 한계를 극복하기 위해 <strong>Canvas API 기반의 자체 차트 엔진</strong>을 구축했습니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (Front-end 전체 개발 및 차트 엔진 구현)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 14 (App Router)</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>Core Technology:</strong> HTML5 Canvas API (Custom Chart Engine)</li>
          <li><strong>State Management:</strong> Recoil, TanStack Query v5</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>자체 제작 차트 엔진:</strong> 라이브러리에 의존하지 않고 HTML5 Canvas API를 직접 다루어 라인 차트, 멀티 라인 차트(비교), 배당금 차트 등을 구현했습니다. 이를 통해 렌더링 성능을 극대화하고 디자인 요구사항을 100% 반영했습니다.</li>
          <li><strong>ETF 비교 분석:</strong> 서로 다른 ETF의 수익률과 주가 추이를 하나의 그래프 위에서 비교할 수 있는 'Multi-Line Chart' 기능을 개발했습니다.</li>
          <li><strong>인터랙티브 UX:</strong> 캔버스 상에서의 터치 및 클릭 이벤트를 정교하게 계산하여, 크로스헤어(Crosshair)와 툴팁을 통해 정확한 데이터 포인트를 조회할 수 있도록 구현했습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>Canvas 픽셀 깨짐(Blurry) 현상:</strong> 고해상도 디스플레이(Retina)에서 캔버스가 흐릿하게 보이는 문제를 해결하기 위해, <strong>DPR(Device Pixel Ratio)</strong>을 고려하여 캔버스 크기를 보정하는 로직을 적용했습니다.</li>
          <li><strong>이벤트 좌표 매핑:</strong> 반응형으로 크기가 변하는 캔버스 위에서 마우스/터치 좌표를 데이터 인덱스로 변환하는 과정에서 오차가 발생했습니다. 이를 해결하기 위해 <code>getBoundingClientRect</code>와 스케일링 팩터를 활용한 <strong>정밀 좌표 보정 함수</strong>를 구현했습니다.</li>
          <li><strong>렌더링 최적화:</strong> 데이터 포인트가 많아질수록 프레임 드랍이 발생했습니다. 이를 방지하기 위해 <strong>Offscreen Canvas</strong> 기법을 도입하고, 불필요한 리렌더링을 막기 위해 <code>requestAnimationFrame</code> 기반의 렌더 루프를 최적화했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: Custom Chart Engine</h3>
        <pre><code class="language-typescript">
// Canvas API를 직접 제어하여 라인 차트를 그리는 핵심 로직
const drawLineChart = ({
  canvasHeight,
  canvasWidth,
  chartHeight,
  chartWidth,
  ctx,
  yConfig,
  dataList,
  viewType,
  isClick,
}: DrawLineChartProps) => {
  const { maxValue, minValue, tickCount, yScale } = yConfig;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.setLineDash([]);

  // Y축 그리드 및 라벨 그리기
  for (let i = 0; i <= tickCount; i++) {
    if (isClick && !(i === 0 || i === tickCount)) continue;
    const absoluteValue = i * yScale;
    const displayValue = absoluteValue + minValue;
    const yPoint = chartHeight - (absoluteValue / (maxValue - minValue)) * chartHeight;

    ctx.fillText(displayValue.toLocaleString(), canvasWidth, yPoint + TOP_PADDING);
  }

  // 데이터 라인 그리기
  ctx.beginPath();
  ctx.strokeStyle = '#235D94';
  ctx.lineWidth = 2;

  dataList.forEach((point, index) => {
    const { rate, clsPrc } = point;
    const val = viewType === 'ratio' ? rate : clsPrc;
    const x = index * (chartWidth / (dataList.length - 1));
    const y = chartHeight - ((val - minValue) / (maxValue - minValue)) * chartHeight;

    if (index === 0) ctx.moveTo(x, y + TOP_PADDING);
    else ctx.lineTo(x, y + TOP_PADDING);
  });
  ctx.stroke();
};
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '미리보잡 API 서버',
      slug: 'miribojob-api',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>미리보잡 플랫폼을 위한 고성능 백엔드 API 서버입니다. 공공데이터 연동부터 인증, 검색까지 핵심 비즈니스 로직을 담당합니다.</p>
        
        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (1인 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Language & Framework:</strong> Java 11, Spring Boot 2.7.12</li>
          <li><strong>Database:</strong> MySQL (Prod), H2 (Test)</li>
          <li><strong>ORM:</strong> Spring Data JPA, QueryDSL 5.0</li>
          <li><strong>Security:</strong> Spring Security, JWT (jjwt)</li>
          <li><strong>Infrastructure:</strong> Docker, Docker Compose</li>
          <li><strong>Documentation:</strong> Swagger (SpringDoc OpenAPI 1.7)</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>동적 쿼리 처리:</strong> QueryDSL을 도입하여 복잡한 검색 조건과 필터링을 Type-Safe하게 처리하고, N+1 문제를 방지하여 조회 성능을 최적화했습니다.</li>
          <li><strong>공공데이터 파이프라인:</strong> 직군, 주소, 기업 정보 등 대용량 공공데이터를 효율적으로 수집하고 가공하여 서비스에 적합한 형태로 적재하는 로직을 구현했습니다.</li>
          <li><strong>보안 시스템:</strong> JWT 기반의 Stateless 인증 방식을 구현하여 확장성을 확보하고, Spring Security를 통해 정교한 권한 관리를 수행했습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>공공데이터 동기화 성능 이슈:</strong> 초기에는 단건 처리로 인해 데이터 적재에 수 시간이 소요되었으나, <strong>Batch Insert</strong>와 <strong>비동기 처리</strong>를 도입하여 처리 시간을 90% 이상 단축했습니다.</li>
          <li><strong>JPA N+1 문제:</strong> 연관 관계가 복잡한 엔티티 조회 시 발생한 N+1 문제를 <strong>Fetch Join</strong>과 <strong>EntityGraph</strong>를 적절히 활용하여 해결했습니다.</li>
          <li><strong>테스트 환경 격리:</strong> H2 인메모리 DB와 프로덕션 MySQL 간의 문법 차이로 인한 이슈를 겪은 후, <strong>Testcontainers</strong> 도입을 고려하여 환경 일치성을 높이는 방향으로 개선을 계획했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: QueryDSL Dynamic Query</h3>
        <pre><code class="language-java">
// QueryDSL을 활용한 동적 검색 조건 처리 및 페이징 최적화
@Override
public Page<KoreaCompanyInfoResponse> searchCompanyInfo(CompanySearchRequest request, Pageable pageable) {
    List<KoreaCompanyInfoResponse> content = queryFactory
            .select(new QKoreaCompanyInfoResponse(
                    koreaCompanyInfo.companyName,
                    koreaCompanyInfo.companyType,
                    koreaCompanyInfo.mainProduct,
                    koreaCompanyInfo.address
            ))
            .from(koreaCompanyInfo)
            .where(
                    containsCompanyName(request.getCompanyName()),
                    eqCompanyType(request.getCompanyType()),
                    containsMainProduct(request.getMainProduct())
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

    JPAQuery<Long> countQuery = queryFactory
            .select(koreaCompanyInfo.count())
            .from(koreaCompanyInfo)
            .where(
                    containsCompanyName(request.getCompanyName()),
                    eqCompanyType(request.getCompanyType())
            );

    return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
}
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1605745341117-7af5bc432de4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '루틴온 (Routine On) - 습관 형성 플랫폼',
      slug: 'routine-on-web',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>사용자의 데일리 루틴 형성을 돕는 웹 애플리케이션입니다. PWA 기술을 적용하여 앱과 유사한 사용자 경험을 제공합니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (Front-end 전체 설계 및 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 14 (App Router), React 18</li>
          <li><strong>Language:</strong> TypeScript</li>
          <li><strong>State Management:</strong> Recoil (Global), React Query (Server)</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>Auth:</strong> NextAuth.js, Custom JWT Handling</li>
          <li><strong>Integration:</strong> Kakao Maps SDK, Firebase (FCM)</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>하이브리드 앱 경험:</strong> PWA(Progressive Web App)를 적용하여 설치 가능한 웹앱을 구현하고, Service Worker를 통해 오프라인 지원 및 푸시 알림(FCM) 기능을 제공했습니다.</li>
          <li><strong>상태 관리 최적화:</strong> Recoil을 사용하여 클라이언트의 전역 상태를 가볍게 관리하고, React Query를 통해 서버 데이터의 캐싱, 동기화, 백그라운드 업데이트를 효율적으로 처리했습니다.</li>
          <li><strong>위치 기반 서비스:</strong> React Kakao Maps SDK를 활용하여 사용자 위치 주변의 정보를 시각화하고 상호작용할 수 있는 지도 기능을 구현했습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>iOS PWA 제약 사항:</strong> iOS Safari에서 PWA의 푸시 알림 지원이 미비했던 시점에, <strong>웹뷰(WebView) 래핑 앱</strong>을 병행 개발하여 크로스 플랫폼 알림 문제를 해결했습니다.</li>
          <li><strong>초기 로딩 속도 개선:</strong> 거대한 라이브러리(Kakao Maps 등)로 인한 TBT(Total Blocking Time) 증가를 확인하고, <strong>Dynamic Import</strong>와 <strong>Next.js Script 전략(lazyOnload)</strong>을 적용하여 초기 로딩 성능을 최적화했습니다.</li>
          <li><strong>상태 관리 복잡도:</strong> 초기에는 모든 상태를 전역으로 관리하려다 복잡도가 증가했습니다. 이를 <strong>Server State(React Query)</strong>와 <strong>Client State(Recoil)</strong>로 명확히 분리하여 코드의 유지보수성을 크게 향상시켰습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: Recoil Atom State</h3>
        <pre><code class="language-typescript">
// 전역 상태 관리를 위한 Recoil Atom 정의
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const commonState = atom({
  key: \`commonState/\${v1()}\`,
  default: {
    isLoading: false,
    isError: false,
    errorMessage: '',
    isToast: false,
    toastMessage: '',
  },
});

export const userLocationState = atom({
  key: \`userLocationState/\${v1()}\`,
  default: {
    latitude: 37.5665,
    longitude: 126.9780,
    isLoaded: false,
  },
});
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '투자 루틴 (Investment Routine) - 자산 관리 대시보드',
      slug: 'investment-routine',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>개인의 투자 습관과 자산 현황을 한눈에 파악할 수 있는 직관적인 금융 대시보드입니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (Front-end 전체 설계 및 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> Next.js 14.2, React 18.3</li>
          <li><strong>UI Library:</strong> NextUI, Framer Motion</li>
          <li><strong>Data Fetching:</strong> TanStack Query v5</li>
          <li><strong>Styling:</strong> Tailwind CSS, tailwind-merge, clsx</li>
          <li><strong>State Management:</strong> Recoil</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>모던 UI/UX:</strong> NextUI 컴포넌트 라이브러리와 Framer Motion을 결합하여 부드러운 애니메이션과 세련된 인터페이스를 구축했습니다.</li>
          <li><strong>데이터 시각화:</strong> 복잡한 투자 데이터를 사용자가 이해하기 쉽도록 다양한 차트와 그래프로 시각화했습니다.</li>
          <li><strong>최신 기술 도입:</strong> TanStack Query v5의 최신 기능을 활용하여 데이터 페칭 로직을 간소화하고, Optimistic Update 등을 통해 사용자 경험을 향상시켰습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>차트 렌더링 성능:</strong> 대량의 거래 내역을 차트로 표현할 때 렌더링 지연이 발생했습니다. <strong>데이터 샘플링(Downsampling)</strong> 기법과 <strong>메모이제이션(useMemo)</strong>을 통해 렌더링 성능을 확보했습니다.</li>
          <li><strong>반응형 디자인의 한계:</strong> 복잡한 테이블과 차트를 모바일 화면에 맞추는 과정에서 UI가 깨지는 문제가 있었습니다. <strong>모바일 전용 카드 뷰(Card View)</strong>로 전환되는 적응형 UI를 구현하여 해결했습니다.</li>
          <li><strong>라이브러리 의존성 관리:</strong> NextUI 버전 업데이트 시 스타일 충돌이 발생했으나, <strong>Tailwind Merge</strong> 유틸리티를 활용하여 스타일 오버라이딩 로직을 견고하게 재설계했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: Chart Component Integration</h3>
        <pre><code class="language-typescript">
// 차트 뷰 타입에 따라 동적으로 차트 컴포넌트를 렌더링하는 컨테이너
export default function ETFChart({ dividendList }: TETFCharProps) {
  const chartSearchValue = useChartSearchValue();

  // 데이터와 뷰 타입에 따라 Y축 설정을 동적으로 계산 (Memoization 적용)
  const yAxisConfg = useMemo(() => getYAxisConfig(
    dividendList,
    chartSearchValue.viewType,
    chartSearchValue.dividendIncluded,
  ), [dividendList, chartSearchValue]);

  return chartSearchValue.dividendIncluded ? (
    <DividendLineChart
      dataList={dividendList}
      yConfig={yAxisConfg}
      viewType={chartSearchValue.viewType}
    />
  ) : (
    <BasicLineChart
      dataList={dividendList}
      yConfig={yAxisConfg}
      viewType={chartSearchValue.viewType}
    />
  );
}
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: '학연 (Hakyeon) - 학교 커뮤니티 앱',
      slug: 'hakyeon-app',
      type: 'PORTFOLIO',
      content: `
        <h2>프로젝트 개요</h2>
        <p>학교 구성원 간의 소통을 위한 하이브리드 모바일 애플리케이션입니다. 웹의 유연성과 네이티브의 기능을 결합했습니다.</p>

        <div class="mb-4 p-4 bg-muted/50 rounded-lg">
          <strong>💡 기여도: 100% (App & Web Front-end 전체 개발)</strong>
        </div>

        <h3>기술 스택 (Tech Stack)</h3>
        <ul>
          <li><strong>Framework:</strong> React Native 0.72 (CLI)</li>
          <li><strong>Hybrid:</strong> react-native-webview</li>
          <li><strong>Styling:</strong> NativeWind (Tailwind for RN)</li>
          <li><strong>Auth:</strong> Kakao Login, Apple Authentication</li>
          <li><strong>Native Features:</strong> Firebase Messaging (FCM), Permissions, In-App Updates</li>
        </ul>

        <h3>핵심 구현 내용</h3>
        <ul>
          <li><strong>WebView 브릿지 통신:</strong> React Native와 WebView 간의 양방향 통신 인터페이스를 설계하여, 웹 코드에서 네이티브 기능(카메라, 알림 등)을 제어할 수 있도록 구현했습니다.</li>
          <li><strong>소셜 로그인 통합:</strong> 카카오와 애플 로그인을 네이티브 모듈로 연동하여 간편하고 안전한 인증 프로세스를 구축했습니다.</li>
          <li><strong>사용자 경험 개선:</strong> BootSplash로 매끄러운 앱 실행 경험을 제공하고, 인앱 업데이트 기능을 통해 사용자가 항상 최신 버전을 유지하도록 유도했습니다.</li>
        </ul>

        <h3>🚀 트러블슈팅 및 개선 경험</h3>
        <ul>
          <li><strong>WebView 통신 지연:</strong> 초기 브릿지 통신 시 미세한 딜레이를 발견했습니다. 메시지 큐 방식을 최적화하고 불필요한 직렬화/역직렬화 과정을 줄여 <strong>통신 속도를 개선</strong>했습니다.</li>
          <li><strong>안드로이드 백버튼 처리:</strong> 웹뷰 내에서의 히스토리 이동과 앱 종료 동작이 충돌하는 문제가 있었습니다. <strong>BackHandler 이벤트 리스너</strong>를 커스텀하여 웹뷰 히스토리가 있으면 뒤로 가고, 없으면 앱 종료 알림을 띄우도록 로직을 정교화했습니다.</li>
          <li><strong>네이티브 권한 파편화:</strong> Android와 iOS의 권한 정책 차이로 인해 기능 오작동이 발생했습니다. <strong>react-native-permissions</strong> 라이브러리를 통해 OS별 권한 요청 로직을 추상화하여 일관된 경험을 제공했습니다.</li>
        </ul>

        <h3>💻 Core Code Snippet: WebView Bridge Interface</h3>
        <pre><code class="language-typescript">
// React Native와 WebView 간의 통신을 처리하는 Hook
export const useWebviewEvent = () => {
  const { pushToken } = useNotification();

  // 앱의 상태(버전, 권한, 디바이스ID 등)를 웹뷰로 전달
  const handleAppState = async (webViewRef: RefObject<WebView>): Promise<void> => {
    const [latestVersion, currentVersion, deviceId, {status}, cameraStatus] = await Promise.all([
      VersionCheck.getLatestVersion(),
      VersionCheck.getCurrentVersion(),
      getUniqueId(),
      RNPermissions.checkNotifications(),
      RNPermissions.check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA),
    ]);

    const state = {
      deviceId,
      latestVersion,
      isNotiAllow: status,
      isCameraAllow: cameraStatus,
      currentVersion,
      os: Platform.OS,
    };

    // 웹뷰로 메시지 전송
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        rnEvent: RNEventEnum.AppState,
        rnData: JSON.stringify(state),
      }));
    }
  };

  return { handleAppState, handleAppleLogin, handleKakaoLogin };
};
        </code></pre>
      `,
      published: true,
      coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  console.log('Seeding projects...');

  for (const project of projects) {
    const existing = await prisma.post.findUnique({
      where: { slug: project.slug },
    });

    if (existing) {
      console.log(`Updating ${project.title}...`);
      await prisma.post.update({
        where: { slug: project.slug },
        data: project as any,
      });
    } else {
      console.log(`Creating ${project.title}...`);
      await prisma.post.create({
        data: project as any,
      });
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
