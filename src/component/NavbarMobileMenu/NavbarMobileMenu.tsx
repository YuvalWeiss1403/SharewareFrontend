import React, { useEffect, useState } from "react";
import "../NavbarMobileMenu/NavbarMobileMenu.css";
import { NavLink } from "react-router-dom";

const NavBarMobileMenu: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
	}, []);
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
				{!isUserLoggedIn && (
					<li className="log-in-mobile-button">
						<NavLink
							className={({ isActive }) =>
								isActive ? "on-page" : "not-on-page"
							}
							to={"/LogIn"}>
							Log In
						</NavLink>
					</li>
				)}
				{!isUserLoggedIn && (
					<li className="sign-up-mobile-button">
						<NavLink
							className={({ isActive }) =>
								isActive ? "on-page" : "not-on-page"
							}
							to={"/SignUp"}>
							Sign Up
						</NavLink>
					</li>
				)}
			</ul>
		</section>
	);
};

export default NavBarMobileMenu;
