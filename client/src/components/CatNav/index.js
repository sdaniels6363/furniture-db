import React from "react";

function CatNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/about">
        About
      </a>
      <a className="navbar-brand" href="/category/beds">
        Beds
      </a>
      <a className="navbar-brand" href="/category/benches">
        Benches
      </a>
      <a className="navbar-brand" href="/category/cabinets">
        Cabinets
      </a>
      <a className="navbar-brand" href="/category/dressers">
        Dressers
      </a>
      <a className="navbar-brand" href="/category/mirrors">
        Mirrors
      </a>
      <a className="navbar-brand" href="/category/nightstands">
        Nightstands
      </a>
    </nav>
  );
}

export default CatNav;
