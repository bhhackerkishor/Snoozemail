# 💤 SnoozeMail – Smart Email Reminder SaaS

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
![Next.js](https://img.shields.io/badge/Built_with-Next.js-blue.svg)
![Made with Love](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)

**SnoozeMail** is a productivity-focused SaaS platform that lets users send **email-based reminders** — simple, reliable, and smart. Whether you’re managing tasks, goals, or daily routines, SnoozeMail ensures you **never forget anything important** again.

---

## 🌐 Live Demo

🔗 [Try SnoozeMail Live »](https://snoozemail.vercel.app)

---

## ✨ Features

- ⏰ **Smart Email Reminders** – Create reminders easily from your dashboard.
- 📅 **Plan-Based Usage Limits**:
  - Free: 1 reminder/month
  - Pro: 100 reminders/month
  - Team: Unlimited
- 🧠 **Natural Language Reminder Input** *(coming soon)*
- 📊 **User Analytics Dashboard**
- 🔒 **Secure Authentication** using Clerk.dev
- 💳 **Subscription Billing** with Razorpay

---

## 🧰 Tech Stack

| Frontend | Backend | Auth | DB | Payments | Deployment |
|----------|---------|------|----|----------|------------|
| Next.js  | Node.js (API Routes) | Clerk | MongoDB | Razorpay | Vercel |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/bhhackerkishor/snoozemail.git
cd snoozemail

# 2. Install dependencies
npm install

# 3. Create environment file
cat > .env.local <<EOL
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
EOL

# 4. Start the app
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 💳 Subscription Plans

```markdown
| Plan   | Reminders/Month | Price         |
|--------|------------------|---------------|
| Free   | 1                | ₹0            |
| Pro    | 100              | ₹49/month     |
| Team   | Unlimited        | ₹199/month    |

Secure billing is powered by [Razorpay](https://razorpay.com).
```

---

## 📁 Folder Structure

```markdown
/app
  /dashboard         --> User dashboard
  /auth              --> Auth pages (Clerk)
  /api               --> Reminder APIs & Payment callbacks

/lib                 --> Database and utilities
/components          --> Reusable UI components
```

---

## 🔮 Upcoming Features

```markdown
- 🧠 Natural Language Parsing (e.g., “Remind me every 2 hours”)
- 📱 Mobile App (React Native)
- 📤 Slack / WhatsApp / Telegram Notification Options
- 🌍 Multi-language support
```

---

## 🖼 Screenshots (Coming Soon)

> Add actual images or GIFs here:

```
📸 dashboard.png
📧 email-preview.png
📊 analytics.png
```

---

## 📦 Deployment

SnoozeMail is deployed on **[Vercel](https://vercel.com/)**. To deploy your own version:

1. Fork the repo
2. Push it to GitHub
3. Import it in [vercel.com](https://vercel.com/new)
4. Add required environment variables
5. Done ✅

---

## 🤝 Contribution

```markdown
SnoozeMail is currently a solo project by Kishore Kumar.

You're welcome to:
- ⭐ Star the repo
- 📥 Fork & clone
- 🐛 Report bugs
- 🚀 Submit pull requests

GitHub: https://github.com/bhhackerkishor/snoozemail
```

---

## 📬 Contact

```markdown
**Author**: Kishore Kumar  
📧 Email: kishorekumardev@gmail.com  
🔗 GitHub: https://github.com/bhhackerkishor  
🔗 LinkedIn: https://linkedin.com/in/kishorekumardev  
🔗 Live: https://snoozemail.vercel.app
```

---

## 📄 License

```markdown
This project is licensed under the MIT License.  
See the [LICENSE](LICENSE) file for full details.
```
