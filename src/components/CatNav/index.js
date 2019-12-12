import React from "react";

function CatNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <a className="navbar-brand" href="/api/category/beds">
        Beds
      </a>
      <a className="navbar-brand" href="/api/category/benches">
        Benches
      </a>
      <a className="navbar-brand" href="/api/category/dressers">
        Dressers
      </a>
      <a className="navbar-brand" href="/api/category/mirrors">
        Mirrors
      </a>
      <a className="navbar-brand" href="/api/category/nightstands">
        Nightstands
      </a>
    </nav>
  );
}

export default CatNav;
