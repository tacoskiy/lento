# Lento

Next.js + Express + PostgreSQL を Docker で構築したフルスタックアプリケーション。

フロントエンドは **Next.js（App Router）**、
バックエンドは **Express + Prisma**、
開発環境は **Docker Compose** で統一しています。

---

## 🧱 技術スタック

### Frontend

* Next.js（App Router）
* TypeScript
* Tailwind CSS
* Node.js 20
* npm

### Backend

* Express
* TypeScript
* Prisma
* PostgreSQL

### Infrastructure

* Docker
* Docker Compose

---

## 📁 ディレクトリ構成

```
.
├── frontend/        # Next.js (client)
├── backend/         # Express API
│   ├── prisma/      # Prisma schema / migrations
│   └── src/
├── db-data/         # PostgreSQL data (Docker volume)
├── .env             # 環境変数（rootに一本化）
├── docker-compose.yml
├── Makefile
└── README.md
```

---

## 🔐 環境変数

環境変数は **root の `.env` に一本化**しています。

```env
# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Backend
PORT=8000
DATABASE_URL=postgresql://user:password@db:5432/appdb
```

> ⚠️ `NEXT_PUBLIC_` が付いていない変数は
> Client Component から参照できません。

---

## 🚀 起動方法

### 初回起動（build 含む）

```bash
make up
```

または

```bash
docker compose up -d --build
```

---

### コンテナ再起動

```bash
make restart
```

---

### コンテナ停止

```bash
make down
```

---

## 🗄 Prisma（DB）

### マイグレーション作成

```bash
docker compose exec backend npx prisma migrate dev --name init
```

### Prisma Studio

```bash
docker compose exec backend npx prisma studio
```

---

## 🔗 API 疎通確認

### Backend 単体

* [http://localhost:8000/health](http://localhost:8000/health)
* [http://localhost:8000/api/hello](http://localhost:8000/api/hello)

### Next.js から

```ts
const res = await apiFetch("/api/hello");
```

---

## 🌐 CORS / 通信設計

* Client Component からの fetch は **ブラウザ基準**
* 開発中は Express 側で `cors()` を使用
* 将来的には Next.js の `rewrites` を使って
  **CORS を不要にする構成を推奨**

---

## 🛠 Makefile コマンド

| コマンド           | 内容         |
| -------------- | ---------- |
| `make up`      | build + 起動 |
| `make down`    | 停止         |
| `make restart` | 再起動        |
| `make logs`    | ログ確認       |
| `make ps`      | コンテナ状態確認   |

---

## 🧠 設計方針

* 環境差分を減らすため Docker を前提
* `.env` は root に一本化
* apiFetch を共通化し fetch 実装を集約
* 型安全より「汎用性・理解しやすさ」を優先

---

## 📌 今後の拡張予定

* Next.js rewrite による API proxy
* 認証（Cookie / Session）
* CRUD API 実装
* Server Components からの fetch 移行
* 本番デプロイ対応

---

## 📝 License

MIT
