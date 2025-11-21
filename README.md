📰 NewsRadar — Full-Stack News Aggregator
⚛ React | 🟩 Node.js | 🚀 Express | 🗄 MongoDB | ⚡ Redis

  ● Built a full-stack, production-ready News Aggregation platform using React, Node.js, MongoDB, and Redis with clean, modular architecture.
  ● Developed a high-performance backend with cursor-based pagination, Redis caching, JWT authentication, and optimized MongoDB queries.
  ● Created a responsive frontend UI supporting category filters, infinite scroll, and real-time news fetching.
  ● Demonstrated strong skills in system design, distributed caching, REST API development, and scalable full-stack engineering.

🚀 Features :

  🔍 Core Functionality
    
    Fetches news by category (tech, business, sports, general, etc.)
    Infinite scroll / Load More with cursor-based pagination
    Fast fetching via Redis caching layer
    Fallback to external news provider API
    Clean UI with category selection, refresh & load-more interactions

  👤 User Functionality

    User registration & login (JWT-based)
    Save & retrieve favorite articles
    Secure protected endpoints

  🧠 Architecture Highlights

    Cached query responses for high performance
    External news sources only hit when needed
    Index-optimized MongoDB queries
    Built with Node.js best practices (services, controllers, middlewares)
    Docker support for backend + MongoDB + Redis
    Clean separation of concerns in both frontend & backend

🏗️ Architecture Diagram 
![Architecture Diagram](https://github.com/shrutibamta/NewsRadar/blob/main/Full-Stack%20Web%20Application%20Architecture%20Diagram.png)

                     ┌─────────────────────────┐
                     │        Frontend         │
                     │      React (Vite/CRA)   │
                     │  Category UI / Calls API│
                     └─────────────┬───────────┘
                                   │  REST API Calls
                                   ▼
                   ┌──────────────────────────────────┐
                   │             Backend              │
                   │       Node.js + Express.js       │
                   │  Controllers → Services → Models │
                   └──────┬───────────────────────────┘
                          │
          ┌───────────────┼────────────────────────────────┐
          ▼               ▼                                ▼
    ┌──────────┐   ┌───────────────┐               ┌───────────────────┐
    │  MongoDB │   │  Redis Cache  │               │ External News API │
    │ Articles │   │ Stores cached │               │  (NewsAPI etc.)   │
    │ Users    │   │ responses     │               │ fallback source   │
    └──────────┘   └───────────────┘               └───────────────────┘

📦 Project Structure:

    NewsRadar/
    │
    ├── backend/
    │   ├── src/
    │   │   ├── controllers/
    │   │   ├── services/
    │   │   ├── models/
    │   │   ├── routes/
    │   │   ├── middlewares/
    │   │   ├── config/
    │   │   ├── app.js
    │   │   └── server.js
    │   ├── package.json
    │   ├── docker-compose.yml
    │   ├── Dockerfile
    │   └── .env.example
    │
    └── frontend/
        ├── src/
        │   ├── components/
        │   ├── utils/
        │   ├── styles.css
        │   ├── App.js
        │   └── index.js
        ├── public/
        └── package.json
