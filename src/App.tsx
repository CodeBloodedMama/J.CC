
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container">
          <Link to="/" className="brand">JYSK Product Explorer</Link>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="app-footer">
        <div className="container">© 2025 — Demo til JYSK code challenge</div>
      </footer>
    </div>
  );
}
