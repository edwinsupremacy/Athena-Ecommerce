import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="not-found">
    <h1>Page not found</h1>
    <p>The page you requested does not exist.</p>
    <Link to="/">Return to shop</Link>
  </main>
);

export default NotFound;
