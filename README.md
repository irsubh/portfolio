# 🚀 Subhankar Mondal Portfolio & Blog (`subhm.in`)

A modern, high-performance **Portfolio & Technical Blog** built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, **Shadcn UI** components, and **Framer Motion** animations.

The entire environment runs inside **Docker**, ensuring clean host isolation, fast builds, and integration with **aaPanel** and **Nginx**.

---

## 🏗️ Architecture & Server Workflow

```
[ Visitor / Client ]
        │
        ▼ (HTTPS / HTTP3 / SSL)
[ aaPanel Nginx Reverse Proxy (:443) ]
        │
        ▼ (Proxy Pass http://127.0.0.1:3000)
[ Docker Container: subhm-portfolio ] (Node.js 20 Standalone)
        ▲
        │ (SSH / SFTP Sync to /www/wwwroot/subhm)
[ Your Local IDE (VS Code / Cursor / etc.) ]
```

---

## ⚡ Quick Management Commands

All commands can be run directly from `/www/wwwroot/subhm` or via the terminal:

### 1. Build & Deploy in Production (Recommended)
```bash
./deploy.sh
```
*Or manually:*
```bash
docker compose up -d --build
```

### 2. Live Development Mode (Hot-Reload over SFTP)
If you are syncing files via SFTP and want live hot-reloading:
```bash
./dev.sh
```
*Or manually:*
```bash
docker compose -f docker-compose.dev.yml up -d
```

### 3. View Live Logs
```bash
./logs.sh
```

### 4. Stop Containers
```bash
./stop.sh
```

---

## 🖥️ aaPanel Docker UI Integration

1. In your **aaPanel** dashboard, click on **Docker** from the left navigation menu.
2. Under the **Container** tab, you will see `subhm-portfolio` running.
3. You can start, stop, restart, view CPU/memory metrics, and inspect logs directly from aaPanel's UI!

---

## 🌐 Nginx Reverse Proxy Setup (subhm.in)

The Nginx configuration for `subhm.in` forwards traffic to the Docker container on port `3000`:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_read_timeout 60s;
}
```

---

## 📁 Project Structure

```
/www/wwwroot/subhm/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with SEO metadata & fonts
│   │   ├── globals.css        # Tailwind + Shadcn design tokens
│   │   ├── page.tsx           # Main homepage (Hero, About, Projects, Experience, Blog, Contact)
│   │   ├── blog/              # Blog index page with search & filters
│   │   │   ├── page.tsx
│   │   │   └── [slug]/        # Individual post reader
│   │   │       └── page.tsx
│   │   └── api/               # Serverless API routes (contact)
│   ├── components/            # UI & section components
│   │   ├── ui/                # Shadcn button, badge, card, input, textarea
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── BlogPreviewSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   ├── data/                  # Profile & blog data
│   │   ├── portfolioData.ts
│   │   └── blogPosts.ts
│   └── lib/                   # Utility helpers (cn, formatDate)
├── Dockerfile                 # Multi-stage optimized Docker build
├── docker-compose.yml         # Production compose configuration
├── docker-compose.dev.yml     # SFTP hot-reloading dev compose configuration
├── deploy.sh                  # Quick production deployment script
├── dev.sh                     # Quick dev hot-reload launcher
├── stop.sh                    # Container stop script
└── logs.sh                    # Live log streamer
```

---

© Subhankar Mondal — [subhm.in](https://subhm.in)
