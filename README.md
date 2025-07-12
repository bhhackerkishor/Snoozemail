---

# 💤 SnoozeMail – Smart Email Reminder SaaS

SnoozeMail is a productivity-focused SaaS tool that lets users **schedule reminders via email** and receive them exactly when needed. Whether you're a busy professional, student, or entrepreneur, SnoozeMail helps you **never miss a task, event, or goal** again.

---

## ✨ Features

- ⏰ **Email-Based Reminders** – Schedule reminders directly from your dashboard.
- 🧠 **Smart Limits by Subscription** – 
  - **Free**: 1 reminder/month  
  - **Pro**: 100 reminders/month  
  - **Team**: Unlimited reminders
- 🌐 **Cloud Sync** – Access your reminders from any device, anytime.
- 🔐 **Authentication & Security** – Powered by [Clerk.dev](https://clerk.dev) for user management.
- 📈 **Dashboard Analytics** – View your usage stats and manage all reminders easily.

---

## 🧰 Tech Stack

| Frontend | Backend | Database | Auth | Payments |
|---------|---------|----------|------|----------|
| Next.js (App Router) | Node.js / Next.js API Routes | MongoDB | Clerk | Razorpay |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/bhhackerkishor/snoozemail.git
cd snoozemail

2. Install Dependencies

npm install

3. Environment Variables

Create a .env.local file and add the following:

CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_key
RAZORPAY_SECRET=your_secret

4. Run Locally

npm run dev

Visit: http://localhost:3000


---

💳 Subscription Plans

Plan	Reminders/Month	Price

Free	1	₹0
Pro	100	₹49/month
Team	Unlimited	₹199/month


All plans are powered by Razorpay.


---

📦 Folder Structure (Simplified)

/app
  /dashboard         --> Main user interface
  /api               --> Reminder & payment APIs
  /auth              --> Clerk authentication
/lib                 --> DB and utility functions
/components          --> Reusable UI components


---

📢 Upcoming Features

Natural Language Input (e.g., “Remind me to drink water every 2 hours”)

Mobile App (React Native)

Multi-language support

Slack & WhatsApp reminders



---

🤝 Contribution

SnoozeMail is currently a solo project, but I’m open to collaboration!
Feel free to fork, clone, or suggest improvements via Issues.


---

📬 Contact

Built by Kishore Kumar
GitHub: @bhhackerkishor
LinkedIn: Kishore Kumar


---

📄 License

This project is licensed under the MIT License.

---
