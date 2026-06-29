# Todo App — React + Redux Toolkit

A full-featured Todo application built as a React learning project, progressively upgraded from plain React state management to **Redux Toolkit** for global state.

## Features

- **Add / Edit / Delete** todos with name, email, phone number, and date fields
- **Toggle status** — mark todos as pending or completed by clicking
- **Search** todos by title in real time
- **Filter** by status: All / Completed / Pending
- **Pagination** with configurable items per page (5 / 10 / 15)
- **Dark mode** toggle
- **LocalStorage persistence** — todos survive page refreshes
- **Loading spinner** while hydrating state from storage

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19 |
| State | Redux Toolkit + React Redux |
| Routing | React Router DOM v7 |
| Styling | SCSS (Sass) |
| Icons | React Icons |
| Spinner | React Spinners |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/<your-username>/react-todo-redux.git
cd react-todo-redux

# Install dependencies
npm install

# Start dev server
npm start
```

App runs at `http://localhost:3000`

## Project Structure

```
src/
├── Features/
│   └── todoSlice.js      # Redux slice — actions & reducers
├── Pages/
│   ├── todomain.jsx      # Main list page (search, filter, pagination)
│   └── TodoListItems.jsx # Add / Edit form page
├── store/
│   └── store.js          # Redux store configuration
├── App.js                # Routes setup
└── App.scss              # Global styles
```

## How It Evolved

This project was built in two stages as a learning exercise:

1. **Stage 1 — Plain React** — state managed with `useState` and `localStorage` read/write directly in components (preserved in comments)
2. **Stage 2 — Redux Toolkit** — migrated to a centralized store with `createSlice`, `useSelector`, and `useDispatch`. `selectedId` for edit routing moved from `localStorage` into Redux state.

## Scripts

```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## License

MIT
