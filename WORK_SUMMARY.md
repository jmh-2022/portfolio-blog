# �️ 상세 작업 리포트 (2025-12-06)

오늘 진행한 **Next.js 블로그 서버 배포 및 보안 구축**의 상세 기술 명세입니다.

---

## 1. 서버 기본 환경 구축 (Ubuntu Server)

### 1-1. Node.js & PM2 (Process Manager)
- **Node.js**: 최신 LTS 버전인 `v22`를 설치하여 Next.js 14 호환성 확보.
- **PM2**: 애플리케이션 무중단 운영을 위해 설치.
    - `ecosystem.config.js` 생성하여 배포 설정 코드화.
    - `pm2 start ecosystem.config.js`로 프로세스 데몬화 완료.

### 1-2. PostgreSQL 데이터베이스
- **사용자 및 DB 생성**:
    ```sql
    CREATE USER myuser WITH PASSWORD 'mypassword';
    CREATE DATABASE blogdb;
    GRANT ALL PRIVILEGES ON DATABASE blogdb TO myuser;
    ALTER USER myuser WITH SUPERUSER; -- 권한 문제 해결을 위해 부여
    ```
- **데이터 마이그레이션**:
    1.  로컬 DB 덤프: `docker exec ... pg_dump ... > blog_portfolio.sql`
    2.  서버 전송: `scp` 프로토콜 사용.
    3.  서버 복원: `psql ... -f blog_portfolio.sql`

### 1-3. Nginx 웹 서버 (Reverse Proxy)
- **역할**: 외부 요청(80, 443)을 받아 내부의 Next.js(3000)로 전달하는 중계자 역할.
- **설정 파일** (`/etc/nginx/sites-available/blog`):
    ```nginx
    server {
        listen 80;
        server_name 10005.kr; # 도메인 연결

        location / {
            proxy_pass http://localhost:3000; # 내부 Next.js로 토스
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

---

## 2. 포트폴리오 콘텐츠 고도화

### 2-1. 데이터 구조 개선 (`prisma/seed.ts`)
- 단순 더미 데이터가 아닌, **실제 이력서 수준**의 데이터로 재구성.
- **6개 핵심 프로젝트** 탑재 (순서: Ebull → HMS → Routine On → ...).
- 각 프로젝트별 상세 항목 추가:
    - **담당 역할 (Role)**: 프론트엔드/백엔드 기여도 명시.
    - **Pros (강점)**: SEO 최적화, 성능 개선 등 구체적 성과.
    - **Improvements (보완점)**: 기술적 아쉬움과 해결 방안.
    - **Core Snippet (핵심 코드)**: `Recoil Selector`, `Axios Interceptor` 등 기술력 증빙 코드 포함.

---

## 3. 네트워크 보안 (Security Hardening)

### 3-1. 방화벽 (UFW - Uncomplicated Firewall)
- **전략**: "필요한 문만 열고 나머지는 다 잠근다" (Whitelist 정책).
- **적용 명령어**:
    ```bash
    sudo ufw default deny incoming  # 기본적으로 들어오는 거 다 차단
    sudo ufw allow 2222/tcp         # SSH (원격 접속용) - 절대 닫으면 안 됨!
    sudo ufw allow 80/tcp           # HTTP (웹사이트)
    sudo ufw allow 443/tcp          # HTTPS (보안 웹사이트)
    sudo ufw deny 3000/tcp          # Next.js 직접 접속 차단 (Nginx 통해서만 접근 가능)
    sudo ufw enable                 # 방화벽 가동
    ```

### 3-2. 공유기 포트포워딩 (ipTime)
- **설정 변경**:
    - 기존: 3000번 포트를 직접 열어둠 (보안 취약).
    - **변경**: 외부에서 들어오는 80, 443 포트만 서버의 192.168.0.17로 연결.
- **해결된 문제**: Certbot 인증 시 발생했던 `522 Connection Timed Out` 에러 해결 (외부 접속 허용).

---

## 4. 도메인 및 HTTPS 구축 (10005.kr)

### 4-1. Cloudflare DDNS (Dynamic DNS)
- **문제**: 가정용 인터넷(동적 IP)은 IP가 주기적으로 바뀜.
- **해결**: Cloudflare API를 이용해 도메인이 항상 현재 집 IP를 가리키도록 설정.
- **자동화 스크립트** (`~/update-cf-dns.sh`):
    - `icanhazip.com`에서 현재 IP 확인.
    - Cloudflare API에 저장된 IP와 다르면 `PUT` 요청으로 갱신.
- **스케줄러 (Crontab)**:
    - `* * * * *` (1분마다) 스크립트 실행하여 아이피 변경 즉시 감지.

### 4-2. SSL/TLS 인증서 (HTTPS)
- **도구**: Let's Encrypt의 **Certbot**.
- **명령어**:
    ```bash
    sudo certbot --nginx -d 10005.kr
    ```
- **Cloudflare 설정**:
    - 초기 `ERR_TOO_MANY_REDIRECTS` 문제 발생.
    - **SSL 모드**를 `Flexible` → **`Full (Strict)`**로 변경하여 해결 (서버-클라우드플레어 구간 암호화).
    - **Always Use HTTPS**: Cloudflare 대시보드에서 활성화하여, 서버 도달 전 Edge 레벨에서 즉시 HTTPS로 리디렉션 처리 (속도 및 보안 향상).

---

## 5. 최종 결과
- **접속 주소**: [https://10005.kr](https://10005.kr)
- **보안 상태**: 🔒 안전함 (TLS 1.3)
- **배포 방식**: 로컬에서 `git push` → GitHub Actions → 서버 자동 배포
