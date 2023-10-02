import React from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/contentWrapper";
import logo from "../../assets/movix-logo.svg";
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <div style={{ width: "100%", margin: "5%" }}>
        <ContentWrapper>
          <div className="logo" onClick={() => {navigate("/");}}>
            <img src={logo} alt="" />
          </div>
          <ul className="menuItems">
            <li
              className="menuItem"
              onClick={(e) => navigationHandler("movie")}
            >
              Movies
            </li>
            <li className="menuItem" onClick={(e) => navigationHandler("tv")}>
              TV Shows
            </li>
            <li className="menuItem">
              <HiOutlineSearch onClick={openSearch} />
            </li>
          </ul>
          <div className="mobileMenuItems">
            <HiOutlineSearch onClick={openSearch} />
            {mobileMenu ? (
              <VscChromeClose onClick={(e) => setMobileMenu(false)} />
            ) : (
              <SlMenu onClick={openMobileMenu} />
            )}
          </div>
        </ContentWrapper>
      </div>
      {showSearch && (
        <div className="searchBar">
          {/* <div style={{ width: "100%", margin: "5%" }}> */}
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv shows...."
                onKeyUp={searchQueryHandler}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <VscChromeClose onClick={(e) => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
        // </div>
      )}
    </header>
  );
};

export default Header;
