# 배포 가이드 (Deployment Guide)

이 가이드는 **흑만두 (Black Dumpling)** 블로그 프로젝트를 개인 서버(`192.168.0.17`)에 배포하는 방법을 설명합니다.

> **범례:**
> *   `[✅ AI 지원 가능]`: 제가 도와드릴 수 있는 부분입니다. **"어떻게 명령해야 하는지"** 예시를 적어두었습니다.
> *   `[👤 사용자 직접 수행]`: 서버에 접속해서 직접 수행하셔야 하는 항목입니다. (저는 보안상 귀하의 서버에 직접 접속할 수 없습니다.)

## 1. 사전 준비 (Prerequisites)

*   **서버 접속 정보**: `j10005@192.168.0.17` (포트 `2222`)
*   **로컬 환경**: Git 설치 및 프로젝트 로컬 구동 확인 완료.

## 2. 서버 환경 설정 (Server Preparation)

먼저 서버에 접속하세요: `[👤 사용자 직접 수행]`
```bash
ssh j10005@192.168.0.17 -p 2222
```

### 2.1. Node.js & PM2 설치 `[👤 사용자 직접 수행]`
서버에서 앱을 실행하고 관리하기 위해 Node.js와 PM2를 설치합니다.

```bash
# Node.js 설치 (NVM 사용 권장)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# PM2 설치 (앱 프로세스 관리 도구)
npm install -g pm2
```

### 2.2. PostgreSQL (데이터베이스) 설치 `[👤 사용자 직접 수행]`
데이터베이스가 없다면 설치하고 설정해야 합니다.

```bash
# 설치 및 서비스 시작
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

데이터베이스 및 유저 생성:
```bash
sudo -u postgres psql

# psql 쉘 내부에서:
CREATE DATABASE blog_db;
CREATE USER blog_user WITH ENCRYPTED PASSWORD '강력한_비밀번호_입력';
GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;
\q
```

## 3. 프로젝트 설치 (Project Setup)

### 3.1. Git 설정 및 코드 가져오기 `[👤 사용자 직접 수행]`
GitHub 등을 통해 코드를 서버로 가져옵니다.

```bash
# 서버에서 실행
git clone https://github.com/your-username/your-repo-name.git blog
cd blog
```

### 3.2. 환경 변수 설정 (.env) `[✅ AI 지원 가능]`
서버 프로젝트 루트에 `.env` 파일을 생성해야 합니다.

> **🤖 AI에게 이렇게 명령하세요:**
> *   "배포용 .env 파일 내용을 만들어 줘."
> *   "AUTH_SECRET 키 하나 생성해 줘."

직접 하신다면:
```bash
nano .env
```
내용 붙여넣기:
```env
DATABASE_URL="postgresql://blog_user:비밀번호@localhost:5432/blog_db"
AUTH_SECRET="생성된_시크릿_키"
```

### 3.3. 의존성 설치 및 빌드 `[👤 사용자 직접 수행]`

```bash
# 패키지 설치
npm install

# DB 스키마 적용
npx prisma migrate deploy
npx prisma generate

# Next.js 앱 빌드
npm run build
```

## 4. 애플리케이션 실행 (Running App) `[👤 사용자 직접 수행]`

PM2를 사용하여 앱을 백그라운드에서 실행합니다.

```bash
pm2 start npm --name "blog" -- start
pm2 save
pm2 startup
```

## 5. Nginx (웹 서버) 설정 `[✅ AI 지원 가능]`

Nginx는 외부 요청을 받아 Next.js 앱으로 전달하는 역할을 합니다.

> **🤖 AI에게 이렇게 명령하세요:**
> *   "Nginx 설정 파일 내용 작성해 줘."
> *   "도메인이 example.com인데 이에 맞는 Nginx 설정 만들어 줘."

### 5.1. Nginx 설치 `[👤 사용자 직접 수행]`
```bash
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 5.2. 설정 파일 작성 `[👤 사용자 직접 수행]`
```bash
sudo nano /etc/nginx/sites-available/blog
```
(AI가 만들어준 내용을 여기에 붙여넣으세요.)

설정 활성화:
```bash
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 6. 도메인 및 동적 IP 연결 (Domain & Dynamic IP)

서버가 유동 IP 환경이므로 외부 접속을 위해 추가 설정이 필요합니다.

### 추천 방법: Cloudflare Tunnel `[✅ AI 지원 가능]`
포트 포워딩 없이 가장 안전하고 쉽게 외부 접속을 설정하는 방법입니다.

> **🤖 AI에게 이렇게 명령하세요:**
> *   "Cloudflare Tunnel 설정하는 방법 자세히 알려줘."
> *   "config.yml 파일은 어떻게 작성해야 해?"

1.  **도메인 구매**: 가비아, 호스팅케이알 등에서 도메인 구매. `[👤 사용자 직접 수행]`
2.  **Cloudflare 연동**: 도메인 네임서버를 Cloudflare로 변경. `[👤 사용자 직접 수행]`
3.  **Tunnel 설치 및 실행**: 서버에 `cloudflared` 설치 후 터널 생성. `[👤 사용자 직접 수행]`

### 대안: DDNS + 포트 포워딩 `[👤 사용자 직접 수행]`
1.  **포트 포워딩**: 공유기 설정에서 포트 80, 443을 서버 IP(`192.168.0.17`)로 포워딩.
2.  **DDNS 설정**: ipTIME 공유기 등의 DDNS 기능 사용.

## 7. 보안 설정 (Security)

### 7.1. SSL 인증서 (HTTPS) `[👤 사용자 직접 수행]`
*   **Cloudflare Tunnel** 사용 시: 자동 적용됨.
*   **Nginx 직접 사용 시**: Certbot 설치 필요.

### 7.2. 방화벽 (UFW) 설정 `[👤 사용자 직접 수행]`
해킹 방지를 위해 방화벽을 켭니다. **주의: SSH 포트(2222)를 반드시 먼저 허용하세요!**

```bash
sudo ufw allow 2222/tcp  # SSH 포트
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---
**요약 체크리스트**

- [ ] **서버 접속**: SSH 접속 성공 `[👤]`
- [ ] **환경 구축**: Node.js, PM2, DB 설치 완료 `[👤]`
- [ ] **코드 배포**: Git Clone -> Build -> PM2 Start `[👤]`
- [ ] **웹 서버**: Nginx 설정 `[✅ "Nginx 설정 만들어줘"]` -> 적용 `[👤]`
- [ ] **외부 접속**: 도메인 구매 `[👤]` -> Cloudflare Tunnel 설정 `[✅ "터널 설정 도와줘"]`
- [ ] **보안**: 방화벽 설정 `[👤]`
