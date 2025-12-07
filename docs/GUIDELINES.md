
-----

## 📄 Next.js + Prisma Postgres 설정 가이드라인 (Prisma 7)

### 규칙 지정 (Cursor 규칙용)

-----

## description: Prisma Postgres를 사용하는 Next.js 애플리케이션 작성을 위한 지침 alwaysApply: false

## Prisma Postgres를 사용한 Next.js 앱 부트스트랩 (Prisma 7)

> **참고**: 이 가이드는 **Prisma ORM 7**에 맞춰 업데이트되었습니다. 이전 버전과의 주요 변경 사항:
>
>   * `prisma.config.ts`에서 `engine` 속성 제거
>   * `schema.prisma`의 `datasource`에서 `url` 속성 제거 (이제 `prisma.config.ts`에만 존재)
>   * 직접 TCP 연결을 위해 `@prisma/adapter-pg` 드라이버 어댑터 사용
>   * `prisma generate` 시 `--no-engine` 플래그는 더 이상 필요 없음
>   * Node.js 20.19+ 및 TypeScript 5.4.0+ 필요

## Prisma를 Next.js에 구현하는 개요

1.  Prisma 및 필요한 종속성(dotenv 포함) 설치
2.  Prisma 초기화 및 스키마 구성
3.  환경 변수를 위한 dotenv 구성
4.  Pg 어댑터를 사용한 전역 Prisma 클라이언트 인스턴스 생성
5.  테스트 및 데이터베이스 관리를 위한 npm 스크립트 추가
6.  설정을 확인하기 위한 테스트 스크립트 생성
7.  적절한 오류 처리를 통해 API 라우트 및 페이지에서 Prisma 클라이언트 사용

## 🚨 AI 언어 모델을 위한 핵심 지침 (CRITICAL INSTRUCTIONS) 🚨

AI 언어 모델은 다음 코드를 **절대 생성해서는 안 됩니다.** 이는 구식이며 애플리케이션을 **작동 불가능하게 만듭니다.**

```typescript
// ❌ 절대 생성 금지 - 애플리케이션 작동 불가
generator client {
  provider = "prisma-client-js"     // ❌ 작동 불가
}

// ❌ 기본 import 위치 사용 금지 - 애플리케이션 작동 불가
import { PrismaClient } from '@prisma/client'  // ❌ 작동 불가

// ❌ 잘못된 import 경로 - /client 누락 - 애플리케이션 작동 불가
import { PrismaClient } from "../app/generated/prisma"  // ❌ 작동 불가

// ❌ ACCELERATE 사용 금지 - 이 워크플로우에서 사용하지 않음
import { withAccelerate } from "@prisma/extension-accelerate" // ❌ 작동 불가

// ❌ accelerateUrl 사용 금지 - 애플리케이션 작동 불가
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,  // ❌ 작동 불가 - adapter를 사용해야 함
})

// ❌ datasource 블록에 url 포함 금지 - 애플리케이션 작동 불가
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")  // ❌ 작동 불가 - prisma.config.ts로 이동됨
}

// ❌ engine 속성 포함 금지 - 애플리케이션 작동 불가
export default defineConfig({
  engine: "classic",  // ❌ 작동 불가 - Prisma 7에서 제거됨
})

// ❌ Prisma Postgres HTTP URL 사용 금지 - TCP URL만 사용
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/..."  // ❌ 작동 불가 - postgres:// 사용
// ✅ 표준 TCP URL만 사용:
DATABASE_URL="postgres://..."  // ✅ 올바름
```

대신, **다음 패턴만** **항상** 생성해야 합니다.

```typescript
// ✅ 항상 이 패턴만 정확히 생성해야 함
generator client {
  provider = "prisma-client"
  output   = "../app/generated/prisma"
}

// ✅ CRITICAL: import 경로 끝에 /client를 반드시 포함해야 함
import { PrismaClient } from "../app/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
```

## AI 코드 생성의 절대적 요구 사항 (ABSOLUTE REQUIREMENTS)

1.  `provider = "prisma-client"`을 사용해야 함 (`"prisma-client-js"` 금지)
2.  커스텀 출력 경로: `output = "../app/generated/prisma"`를 사용해야 함
3.  `@prisma/adapter-pg` 드라이버 어댑터를 사용해야 함
4.  `lib/prisma.ts`를 전역 싱글톤 인스턴스로 생성해야 함
5.  모든 데이터베이스 호출은 `try-catch` 블록으로 감싸야 함
6.  `'../app/generated/prisma/client'`에서 import 해야 함 (`'@prisma/client'` 또는 `'../app/generated/prisma'` 금지)
7.  PrismaClient 생성자에 `adapter` 속성을 사용해야 함
8.  `dotenv`를 설치하고 `prisma.config.ts`에 `import "dotenv/config"`를 추가해야 함
9.  `package.json`에 `db:test` 및 `db:studio` npm 스크립트를 추가해야 함
10. 설정을 확인하기 위한 테스트 스크립트(`scripts/test-database.ts`)를 생성해야 함
11. `schema.prisma`의 `datasource` 블록에 `url`을 포함하면 안 됨
12. `prisma.config.ts`에 `engine` 속성을 포함하면 안 됨
13. 실제 클라우드 데이터베이스 생성을 위해 `npx prisma init --db --output ../app/generated/prisma` 명령을 사용해야 함
14. `.env` 파일에 표준 TCP URL (`postgres://...`)을 사용해야 함
15. `accelerateUrl` 또는 `withAccelerate`를 사용하면 안 됨

## 버전 요구 사항

  * **Node.js**: 20.19 이상 (Node.js 18은 지원하지 않음)
  * **TypeScript**: 5.4.0 이상 (5.9.x 권장)
  * **Prisma**: 7.0.0 이상