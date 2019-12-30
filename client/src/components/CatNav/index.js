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
      // <nav className="navbar navbar-expand-lg" id="catNavBar">

      //   All navigation links with the exception of the About page are derived from a database call.
      //   Which occurs via the getCategories function.
      //   This will allow us to load links dynamically based on the category of furniture in the database.

      //   {this.state.categories.map((category,i) => {
      //     return (
      //       <a 
      //         key={i}
      //         className="navbar-brand" 
      //         href={`/category/${category}`}>
      //         {category.toUpperCase()}
      //       </a>
      //     );
      //   })}
      //   <div className="admin-controls">
      //     <a className="navbar-brand" href="/clients">CLIENTS</a>
      //     <a className="navbar-brand" href="/about">ABOUT</a>
      //   </div>
      // </nav>


      // <div>
      //   <div className="collapse admin-controls" id="burger-items">
      //     <a className="navbar-brand" href="/clients">CLIENTS</a>
      //     <a className="navbar-brand" href="/about">ABOUT</a>
      //   </div>
      //   <nav className="navbar navbar-expand" id="catNavBar">
      //     <button className="navbar-toggler admin-controls" type="button" data-toggle="collapse" data-target="#burger-items" aria-controls="burger-items" aria-expanded="false" aria-label="Toggle navigation"><span><i class="fas fa-bars fa-1x"></i></span></button>

      //     {this.state.categories.map((category, i) => {
      //       return (
      //         <a
      //           key={i}
      //           className="navbar-brand"
      //           href={`/category/${category}`}>
      //           {category.toUpperCase()}
      //         </a>
      //       );
      //     })}
      //   </nav>
      // </div>

      <nav className="navbar navbar-expand-lg" id="catNavBar">

        {/* All navigation links with the exception of the About page are derived from a database call.
        Which occurs via the getCategories function.
        This will allow us to load links dynamically based on the category of furniture in the database. */}

        {this.state.categories.map((category, i) => {
          return (
            <a
              key={i}
              className="navbar-brand"
              href={`/category/${category}`}>
              {category.toUpperCase()}
            </a>
          );
        })}
        <div className="admin-controls dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-bars fa-1x" id="myicon"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="/clients">CLIENTS</a>
            <a className="dropdown-item" href="#">CHANGE PASSWORD</a>
            <a className="dropdown-item" href="/about">ABOUT</a>
            <a className="dropdown-item" href="#">LOGOUT</a>
          </div>
        </div>
      </nav>
    );
  }
}

export default CatNav;
