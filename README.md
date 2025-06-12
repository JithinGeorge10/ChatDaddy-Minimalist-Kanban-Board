# 📝 Frontend Test — Minimalist Kanban Board

This is a minimalist Kanban board built with **React**, **TypeScript**, **Tailwind CSS**, and **@dnd-kit** for drag-and-drop functionality. Tasks are persisted locally using `localStorage`.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/JithinGeorge10/ChatDaddy-Minimalist-Kanban-Board.git
cd kanban-board


### 2. Install Dependencies

npm install


### 3.Run the App

npm run dev

The app should now be running at http://localhost:5173

📌 Features
Add new tasks (default column: Not Started)

Drag tasks between columns (Not Started, In Progress, Blocked, Done)

Drag and drop works with visual feedback (overlay)

Tasks are persisted in the browser using localStorage

Responsive layout using Tailwind CSS

✅ Assumptions Made

Tasks are uniquely identified using uuid

Task creation is limited to the Not Started column

No user authentication or backend; all data is stored in browser's localStorage

Double-click behavior is not assigned to any functionality

A task can only be moved across columns, not reordered within the same column (unless added later)



![Kanban Board Preview](https://raw.githubusercontent.com/JithinGeorge10/ChatDaddy-Minimalist-Kanban-Board/main/sample.png)



### Built With
React

TypeScript

Tailwind CSS

@dnd-kit
