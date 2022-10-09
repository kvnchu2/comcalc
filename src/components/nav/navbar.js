import React from "react";
import "./navbar.css";
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div id="navbar">
      <Link class="navbar-link" to="/">Home</Link>
      <Link class="navbar-link" to="/clients">Clients</Link>
      <Link class="navbar-link" to="/billing">Billing</Link>
    </div>
  )
};