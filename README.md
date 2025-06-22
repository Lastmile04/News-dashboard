# News Dashboard

A modern, full-stack news dashboard built with React, Firebase, Tailwind CSS, and AI-powered features. This project provides a real-time, interactive platform for viewing, filtering, and analyzing news articles, with advanced admin tools for payout management and data export.

---

## Features

### 1. **Authentication**
- Google Sign-In using Firebase Authentication.
- Secure access: Only authenticated users can access the dashboard.
- Admin role (by email) unlocks payout management features.

### 2. **News Dashboard**
- Fetches live news articles from the NewsAPI (requires API key).
- Filter articles by keyword, author, date, and category.
- Responsive, dark-mode enabled UI with Tailwind CSS.

### 3. **AI-Powered Summaries & Briefings**
- Summarize any article into concise bullet points using Google Gemini API.
- Generate an AI-powered news briefing for all visible articles.
- Summaries and briefings are shown in a modal for easy reading.

### 4. **Sentiment Analysis**
- Visualize sentiment distribution (positive, neutral, negative) of articles with Recharts.
- Each article displays its sentiment score and color-coded indicator.

### 5. **Admin Payout & Export Tools**
- Admins can view and update the payout rate per article.
- Export payout details as PDF, CSV, or directly to Google Sheets.
- Google Sheets export uses OAuth and Google Sheets API (requires credentials).

---

## Getting Started

### 1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/news-dashboard.git
cd news-dashboard
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Environment Variables**
Create a `.env.local` file in the root directory with the following (see `.env.local` for template):

```
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
REACT_APP_NEWS_API_KEY=your_news_api_key
REACT_APP_GEMINI_API_KEY=your_gemini_api_key
REACT_APP_GOOGLE_API_KEY=your_google_api_key
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

- Get Firebase credentials from [Firebase Console](https://console.firebase.google.com/).
- Get NewsAPI key from [newsapi.org](https://newsapi.org/).
- Get Gemini API key from [Google AI Studio](https://aistudio.google.com/).
- For Google Sheets export, set up a Google Cloud project and enable Sheets API.

### 4. **Start the App**
```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

---

## Usage & Features

### **Login**
- Sign in with Google to access the dashboard.

### **Dashboard**
- Filter news by keyword, author, date, or category.
- View articles with sentiment scores and summaries.
- Click "Summarize" to get an AI summary of any article.
- Generate an AI-powered news briefing for all articles.
- View sentiment distribution chart.

### **Admin Tools**
- If logged in as admin (see `ADMIN_EMAIL` in `AppContext.js`), access payout management.
- Update payout rate per article.
- Export payout details as PDF, CSV, or Google Sheets.

---

## Tech Stack
- **React** (with Context API & Hooks)
- **Firebase** (Auth & Firestore)
- **Tailwind CSS** (Dark mode, responsive design)
- **Recharts** (Data visualization)
- **Google Gemini API** (AI summaries)
- **NewsAPI** (Live news data)
- **jsPDF** (PDF export)
- **Google Sheets API** (Data export)

---

## Folder Structure

```
news-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/           # Login component
│   │   ├── common/         # Shared UI (AIModal, Spinner)
│   │   └── dashboard/      # Dashboard UI (Header, ArticleList, etc.)
│   ├── context/            # AppContext (global state)
│   ├── data/               # Mock data
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Firebase, Gemini API logic
│   ├── pages/              # Dashboard page
│   ├── index.js            # App entry
│   └── App.js              # App root
├── .env.local              # Environment variables (not committed)
├── package.json            # Dependencies & scripts
├── tailwind.config.js      # Tailwind config
└── README.md               # Project documentation
```

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[MIT](LICENSE)

---

## Credits
- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NewsAPI](https://newsapi.org/)
- [Google Gemini](https://aistudio.google.com/)
- [jsPDF](https://github.com/parallax/jsPDF)
- [Recharts](https://recharts.org/)
- [Google Sheets API](https://developers.google.com/sheets/api)
