# ClauseGuard

AI-powered legal contract analyzer that extracts clauses from agreements, identifies risky sections, explains risks in plain English, and provides fair rewrites using RAG.

## Features

- Upload legal contracts (`.pdf`, `.docx`, `.txt`)
- AI-powered clause extraction
- Risk scoring system
- Categorized clause analysis
- Plain-English explanations
- Fair rewrite suggestion using RAG
- Responsive UI
- HTTPS-secured API
- Dockerized backend deployment


# Tech Stack

## Frontend
- React
- TypeScript
- TanStack Router
- TanStack Query
- TailwindCSS
- Vite

## Backend
- FastAPI
- Python
- Uvicorn
- Pydantic
- Supabase (pgvector)

## DevOps / Infrastructure
- Docker
- Docker Compose
- Nginx
- AWS EC2
- Vercel
- Cloudflare
- Certbot SSL

## AI API
- Openrouter (Gemini api) for clause anlaysis
- Hugging face (BAAI/bge-small) for query & clause embeddings


# Project Structure

## Backend

```txt
backend/
│
├── app/
│   ├── api/v1/
│   │   ├── contract.py
│   │   └── router.py
│   │
│   ├── core/
│   ├── rag/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
└── .env.example
```

---

## Frontend

```txt
frontend/
│
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── routes/
│   ├── store/
│   ├── types/
│   ├── main.tsx
│   ├── router.tsx
│   └── styles.css
│
├── index.html
├── package.json
└── .env.example
```

---

# Local Setup

## 1. Clone Repository

```bash
git clone <your-repo-url>
cd clauseguard
```

---

# Backend Setup

## 1. Navigate

```bash
cd backend
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

## 3. Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / Mac

```bash
source venv/bin/activate
```

---

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 5. Setup Environment Variables

Create `.env`

```env
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_api_key
```

---

## 6. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```txt
http://localhost:8000
```

Swagger docs:

```txt
http://localhost:8000/docs
```

---

# Frontend Setup

## 1. Navigate

```bash
cd frontend
```

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Setup Environment Variables

Create `.env`

```env
VITE_API_URL=http://localhost:8000
```

---

## 4. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Production Deployment

## Frontend
- Hosted on Vercel
- Custom domain configured

## Backend
- Hosted on AWS EC2
- Dockerized FastAPI app
- Nginx reverse proxy
- HTTPS using Certbot

---

# Docker Deployment

## Build Image

```bash
docker build -t slayerx164/backend:latest .
```

## Push Image

```bash
docker push slayerx164/backend:latest
```

## Run With Docker Compose

```bash
docker-compose up -d
```

---

# API Endpoint

```txt
POST /api/analyse
```

Accepts:
- multipart/form-data
- contract file upload

---

# Future Improvements

- Authentication
- Saved analysis history
- Clause highlighting
- OCR support
- Multi-language contracts
- Export reports
- Payment integration
- AI chat with contracts
