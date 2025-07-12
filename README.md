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

```bash
# 1. Clone the repository
git clone https://github.com/bhhackerkishor/snoozemail.git
cd snoozemail

# 2. Install dependencies
npm install

# 3. Create .env.local file with the following content:
cat > .env.local <<EOL
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
EOL

# 4. Run the development server
npm run dev
```

Visit your local app at: [http://localhost:3000](http://localhost:3000)

---

## 💳 Subscription Plans

```markdown
| Plan   | Reminders/Month | Price         |
|--------|------------------|---------------|
| Free   | 1                | ₹0            |
| Pro    | 100              | ₹49/month     |
| Team   | Unlimited        | ₹199/month    |

All payments are securely handled using [Razorpay](https://razorpay.com).
```

---

## 📦 Folder Structure

```markdown
/app
  /dashboard         --> Main user interface
  /api               --> Reminder & payment APIs
  /auth              --> Clerk authentication

/lib                 --> DB and utility functions
/components          --> Reusable UI components
```

---

## 📢 Upcoming Features

```markdown
- 🧠 Natural Language Input (e.g., “Remind me to drink water every 2 hours”)
- 📱 Mobile App (React Native)
- 🌐 Multi-language support
- 🔔 Slack & WhatsApp Reminders
```

---

## 🤝 Contribution

```markdown
SnoozeMail is currently a solo project built by Kishore Kumar.

Feel free to fork, clone, and contribute:
- Raise an issue or bug report
- Suggest new features
- Submit a pull request

GitHub Repo: https://github.com/bhhackerkishor/snoozemail
```

---

## 📬 Contact

```markdown
**Developer**: Kishore Kumar  
📧 Email: kishorekumardev@gmail.com  
🔗 GitHub: https://github.com/bhhackerkishor  
🔗 LinkedIn: https://linkedin.com/in/kishorekumardev
```

---

## 📄 License

```markdown
This project is licensed under the MIT License.  
See `LICENSE` file for more details.
```
