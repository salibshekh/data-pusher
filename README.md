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

| Method | Endpoint                | Description                               |
| ------ | ----------------------- | ----------------------------------------- |
| `POST` | `/auth/register`        | Register a new user & auto-create account |
| `POST` | `/auth/login`           | Login & receive JWT token                 |
| `POST` | `/destinations`         | Add webhook destination                   |
| `POST` | `/server/incoming_data` | Receive & forward client data             |
| `GET`  | `/logs`                 | Fetch recent logs                         |
| `GET`  | `/api-docs`             | Swagger Documentation                     |

| Header          | Description                                               |
| --------------- | --------------------------------------------------------- |
| `CL-X-TOKEN`    | Account’s `app_secret_token` (from registration response) |
| `CL-X-EVENT-ID` | Unique event identifier (to avoid duplicates)             |
| `Content-Type`  | Always `application/json`                                 |

# Example Request
POST /server/incoming_data
Headers:
  CL-X-TOKEN: 9a8c63e9f23b4122b86b6c73ad01f07d
  CL-X-EVENT-ID: order-2025-001
  Content-Type: application/json

Body:
{
  "order_id": "12345",
  "customer_name": "John Doe",
  "amount": 999.99,
  "currency": "INR"
}

# Response:
{
  "success": true,
  "message": "Data received"
}

# Logs Example
{
  "success": true,
  "logs": [
    {
      "event_id": "order-2025-001",
      "status": "queued",
      "response_code": 200,
      "received_timestamp": "2025-10-08T06:23:01.234Z"
    }
  ]
}

# 🧱 Environment Variables (.env.example)
PORT=4000
MONGO_URI=mongodb://localhost:27017/data-pusher
REDIS_URL=redis://127.0.0.1:6379
JWT_SECRET=your_secret_key


