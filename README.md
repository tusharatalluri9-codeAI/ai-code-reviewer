# 🔍 AI Code Reviewer

An AI-powered code review tool built with **React 19** that analyzes your code through multiple expert personas powered by Claude AI.

![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=flat-square&logo=vite)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-teal?style=flat-square&logo=tailwindcss)
![AI](https://img.shields.io/badge/AI-Claude%20Haiku-orange?style=flat-square)

## ✨ Features

- **3 AI Review Personas** — Senior Dev, Security Auditor, Performance Engineer
- **Monaco Editor** — VS Code's editor running in the browser
- **AI Code Analysis** — Bugs, security issues, performance problems detected instantly
- **Improved Code** — AI rewrites your code with fixes applied
- **Follow-up Chat** — Ask questions about your review results
- **Review History** — Browse all past code reviews
- **7 Languages** — JavaScript, TypeScript, Python, Java, C++, Go, Rust

## 🛠 Tech Stack

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| React 19              | Frontend framework           |
| TypeScript (strict)   | Type safety                  |
| Zustand               | Lightweight state management |
| TanStack Query        | Server state management      |
| Monaco Editor         | VS Code editor in browser    |
| Tailwind CSS 4        | Utility-first styling        |
| Claude AI (Anthropic) | AI-powered code analysis     |
| Vite                  | Build tool                   |

## 🏗 Architecture

src/
├── components/
│ ├── Editor/ # Monaco code editor + controls
│ ├── Layout/ # Navbar
│ └── Review/ # Results, chat, history panels
├── services/ # Anthropic AI API integration
├── store/ # Zustand global state
└── types/ # TypeScript interfaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
# Clone the repo
git clone https://github.com/tusharatalluri9-codeAI/ai-code-reviewer.git

# Navigate to project
cd ai-code-reviewer

# Install dependencies
npm install

# Add your Anthropic API key in
# src/services/aiService.ts
# Replace 'YOUR_ANTHROPIC_KEY_HERE' with your key

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🤖 AI Personas

| Persona                 | Focus                                              |
| ----------------------- | -------------------------------------------------- |
| 👨‍💻 Senior Dev           | Bugs, best practices, readability, maintainability |
| 🔒 Security Auditor     | Vulnerabilities, injection risks, auth issues      |
| ⚡ Performance Engineer | Bottlenecks, memory leaks, algorithm efficiency    |

## 🔑 Environment Setup

This project requires an [Anthropic API key](https://console.anthropic.com). Add it to:
src/services/aiService.ts

## 📄 License

MIT
