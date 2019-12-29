import React, { Component } from "react";
import API from "../../utils/API";
import "../../styles/CatNav.css";

class CatNav extends Component {
  state = {
    categories: []
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    API.getCategories()
      .then(res => {
        let data = res.data.sort()
        // console.log(res.data);
        this.setState({
          categories: data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg" id="catNavBar">
        {/* 
        All navigation links with the exception of the About page are derived from a database call.
        Which occurs via the getCategories function.
        This will allow us to load links dynamically based on the category of furniture in the database.
        */}
        {this.state.categories.map((category,i) => {
          return (
            <a 
              key={i}
              className="navbar-brand" 
              href={`/category/${category}`}>
              {category.toUpperCase()}
            </a>
          );
        })}
        <div className="admin-controls">
          <a className="navbar-brand" href="/clients">CLIENTS</a>
          <a className="navbar-brand" href="/about">ABOUT</a>
        </div>
      </nav>
    );
  }
}

export default CatNav;
