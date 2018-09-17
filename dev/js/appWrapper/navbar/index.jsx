import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './navbar.scss';

class Navbar extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUrl: window.location.pathname,
    }
  }

  componentDidMount() {
    let currentUrl = window.location.pathname,
        links = document.querySelectorAll("#navbar-component a"),
        sortedLinks = this.sortLinks(links);

    $(sortedLinks).removeClass("selected").first().addClass("selected");

    $("#navbar-component a").on("click", (e) => {
      $("#navbar-component a").removeClass("selected");
      $(e.target).addClass("selected");
    });
  }

  // Sort Link Url by their matching url segments with the current url
  sortLinks(links){
    return $(links).sort((a, b) => {
        let currentUrlSegments = this.state.currentUrl.split("/").filter(segment => segment !==""),
            aSegments = $(a).attr("href").split("/").filter(segment => segment !==""),
            bSegments = $(b).attr("href").split("/").filter(segment => segment !==""),
            acounter = 0,
            bcounter = 0;

        for(let i = 0; i < aSegments.length; i++){
          if(aSegments[i] === currentUrlSegments[i]){
            acounter ++;
          }
        }

        for(let i = 0; i < bSegments.length; i++){
          if(bSegments[i] === currentUrlSegments[i]){
            bcounter ++;
          }
        }
        return bcounter - acounter;
    })
  }

  render() {
    return (
      <div id="navbar-component">
        <ul>
          <li><Link to="/"> Home page </Link></li>
          <li><Link to="/counter"> Counter tool </Link></li>
          <li><Link to="/movies"> Movies </Link></li>
          <li><Link to="/about">About this site </Link></li>
        </ul>
      </div>
    );
  }
}


export default Navbar;
