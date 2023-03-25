import React from "react";
import "../NavbarMobileMenu/NavbarMobileMenu.css";
import { NavLink } from "react-router-dom";

const NavBarMobileMenu: React.FC = () => {
return (
    <section className="mobile-nav">
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
            <div className="menu-button"></div>
        </label>
        <ul className="menu">
            <li className="ShareSpace-mobile-button">
                <NavLink
                    className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
                    to={"/ShareSpace"}>
                    ShareSpace
                </NavLink>
            </li>
            <li className="tips-mobile-button">
                <NavLink
                    className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
                    to={"/Tips"}>
                    Tips And Advices
                </NavLink>
            </li>
            <li className="log-in-mobile-button">
                <NavLink
                    className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
                    to={"/LogIn"}>
                    Log In
                </NavLink>
            </li>
            <li className="sign-up-mobile-button">
                <NavLink
                    className={({ isActive }) => (isActive ? "on-page" : "not-on-page")}
                    to={"/SignUp"}>
                    Sign Up
                </NavLink>
            </li>
            <li>
                <button className="contact-us">Contact Us</button>
            </li>
            <li>
                <button className="term-of-use">Term of Use</button>
            </li>
            <li>
                <button className="privacy-policy">Privacy Policy</button>
            </li>
        </ul>
    </section>
    );
};

export default NavBarMobileMenu;