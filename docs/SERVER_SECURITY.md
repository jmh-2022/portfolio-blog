# 서버 보안 강화 및 악성코드 대응 가이드 (Server Security & Incident Response)

이 문서는 우분투(Ubuntu) 리눅스 서버를 운영하며 악성코드 감염을 예방하고, 만약 감염되었을 때 대응하는 절차를 다룹니다.

## 1. 🛡️ 사전 예방 (가장 중요)

재설치 건, 포맷 후 초기 설정 시 아래 내용을 반드시 적용하세요.

### 1-1. Root 로그인 차단 및 SSH 설정 강화
해커들은 주로 기본 포트(22)와 `root` 계정을 무차별 대입(Brute Force)하여 공격합니다.

1.  **새로운 사용자 생성 (Root 대신 사용)**
    ```bash
    adduser myuser  # 원하는 아이디로 생성
    usermod -aG sudo myuser # sudo 권한 부여
    ```

2.  **SSH 설정 변경 (`/etc/ssh/sshd_config`)**
    ```bash
    Port 2222              # 포트 변경 (22 -> 2222 등 임의의 숫자)
    PermitRootLogin no     # Root 로그인 직접 허용 차단
    PasswordAuthentication no # 비밀번호 로그인 차단 (SSH Key만 허용)
    ```
    *변경 후 `sudo service ssh restart` 필수*

### 1-2. 방화벽 (UFW) 활성화
필요한 문만 열어두어야 합니다.

```bash
sudo ufw allow 2222/tcp  # 변경한 SSH 포트
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable          # 방화벽 켜기
```
*주의: SSH 포트를 허용하지 않고 켜면 접속이 끊길 수 있습니다.*

### 1-3. Fail2Ban 설치
로그인 실패가 반복되면 해당 IP를 자동으로 차단해주는 도구입니다.

```bash
sudo apt update
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

---

## 2. 👁️ 상시 모니터링 (이상 징후 감지)

악성코드는 보통 CPU를 비정상적으로 많이 사용하거나, 모르는 포트를 엽니다.

### 2-1. CPU 사용량 확인 (`htop`)
```bash
htop
```
*   **정상**: 서비스 이용량이 없을 때 CPU 사용률 0~5% 미만.
*   **비정상**: 아무것도 안 하는데 특정 프로세스(예: `fghgf`, `kdevtmpfsi`)가 CPU 90~100% 점유.

### 2-2. 열린 포트 확인 (`netstat`)
```bash
sudo netstat -tulpn
```
*   내가 실행한(Nginx, Node, SSH) 서비스 외에 알 수 없는 프로세스가 포트를 열고 있는지 확인하세요.

---

## 3. 🚨 감염 발생 시 대응 매뉴얼 (Incident Response)

만약 다시 CPU가 치솟거나 이상한 프로세스가 발견된다면 아래 순서대로 행동하세요.

### 1단계: 네트워크 차단 (격리)
가장 먼저 해커가 명령을 내리거나 데이터를 빼가지 못하게 막아야 합니다.
*   물리 서버라면 랜선을 뽑는 것이 확실합니다.
*   클라우드라면 콘솔에서 인바운드/아웃바운드 규칙을 모두 차단하십시오 (자신의 SSH용 IP 제외).

### 2단계: 프로세스 확인 및 종료
```bash
# CPU 많이 쓰는 순서로 보기
top -c

# 의심 프로세스 강제 종료 (PID 확인 후)
sudo kill -9 [PID]
```

### 3단계: 자동 실행 연결고리 끊기
악성코드는 죽여도 다시 살아나도록 설정되어 있는 경우가 많습니다.

1.  **Crontab 확인** (스케줄러에 등록되었는지)
    ```bash
    crontab -l
    sudo crontab -l
    ls /var/spool/cron/crontabs/
    ```
2.  **임시 디렉토리 확인** (악성코드가 주로 숨는 곳)
    ```bash
    ls -la /tmp
    ls -la /var/tmp
    ```
3.  **실행 권한 뺏기**
    ```bash
    sudo chmod 000 /tmp/악성파일이름
    ```

### 4단계: (권장) 서버 초기화 (Reinstall)
**이것이 유일하게 100% 안전한 방법입니다.**
리눅스 시스템은 한 번 `root` 권한을 탈취당하면, 해커가 시스템 깊숙한 곳(커널, 시스템 라이브러리 등)에 백도어(뒷문)를 심어놓을 수 있습니다. 눈에 보이는 악성코드를 지워도 며칠 뒤에 다시 들어올 수 있습니다.

**"타협하지 마세요. 감염되면 백업 데이터만 챙기고 OS를 새로 까는 것이 가장 빠르고 안전합니다."**

---

## 4. 📦 배포 시 주의사항 (Next.js)

1.  **관리자 권한으로 실행 금지**: 절대 `root` 계정으로 `npm run start`를 하지 마세요. 배포 전용 계정을 만들어 사용하세요.
2.  **모든 비밀(Environment Variables) 관리**: `.env` 파일이 깃허브 등에 올라가지 않도록 `.gitignore`를 철저히 관리하세요. DB 정보가 털리면 DB도 감염됩니다.
