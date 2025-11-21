NewsRadar Backend
=================

Quick start:
  1. Copy this backend folder into your NewsRadar repo (so repo root has `frontend/` and `backend/`)
  2. Create .env from .env.example
  3. npm install
  4. npm run dev

Endpoints:
  GET  /api/news?category=general&limit=20&cursor=
  POST /api/auth/register
  POST /api/auth/login
  GET  /api/user/favorites (requires Authorization: Bearer <token>)
  POST /api/user/favorites (requires Authorization)

Resume path in workspace: /mnt/data/Resume.pdf
