import React, { Component } from "react";
import API from "../../utils/API";

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
        console.log(res.data);
        this.setState({
          categories: res.data
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/about">
          About
        </a>
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
      </nav>
    );
  }
}

export default CatNav;
