# 🚀 Data Pusher

**Data Pusher** is a Node.js-based **data forwarding (webhook relay)** system built using **Express**, **MongoDB**, **Redis**, and **Bull**.  
It allows external applications to send JSON payloads to a single endpoint, which are then asynchronously forwarded to multiple destinations configured per account.

---

## 🧩 Features
- ⚡ JWT-based Authentication (Register / Login)
- 🏦 Account-based model with unique `app_secret_token`
- 🔗 Destination URLs with custom headers
- 🕒 Asynchronous data forwarding using **Bull Queue** + **Redis**
- 🔐 Rate-limiting per account (5 req/sec)
- 🧾 Event logging for success/failure tracking
- 🧰 Role-based access control (Admin / Normal)
- 🧠 Swagger API Documentation
- 🧪 Jest + Supertest setup for testing

---

## 🧰 Tech Stack
| Layer | Technology |
|-------|-------------|
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB (Mongoose) |
| **Queue System** | Bull + Redis |
| **Auth** | JWT + bcryptjs |
| **Docs** | Swagger UI |
| **Tests** | Jest + Supertest |

---

## ⚙️ Setup Instructions

```bash
# 1️⃣ Clone repository
git clone https://github.com/<your-username>/data-pusher.git
cd data-pusher

# 2️⃣ Install dependencies
npm install

# 3️⃣ Setup environment
cp .env
# (then edit .env with your MongoDB & Redis credentials)

# 4️⃣ Seed initial roles
npm run seed:roles

# 5️⃣ Run the API server
npm run dev

# 6️⃣ Start background worker
npm run worker
