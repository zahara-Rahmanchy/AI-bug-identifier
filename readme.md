#  AI-Powered Bug Identifier API

An intelligent API that accepts small code snippets and returns possible bugs (logical, runtime, off-by-one, etc.) with suggestions — powered by Google Gemini.



##  Live link: 
-   https://ai-bug-identifier.vercel.app

## 📦 Tech Stack

- Node.js + Express
- TypeScript
- Google Gemini API
- Vercel (deployment)
- Built-in Rate Limiting

---

##  Getting Started (Locally)

### 1. Clone the repository

git clone https://github.com/zahara-Rahmanchy/AI-bug-identifier.git  


### 2. Install dependencies

npm install

### 3. Set up environment variables

Create a `.env` file in the root directory:

PORT=5000  
GEMINI_API_KEY=your-gemini-api-key

Replace `your-gemini-api-key` with your actual key from [Google AI Studio](https://aistudio.google.com/).

### 4. Run the server

npm run dev

Server will start at `http://localhost:${PORT}`
