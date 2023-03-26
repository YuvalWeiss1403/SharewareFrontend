import "../Navbar/Navbar.css";
import Navlinkbutton from "../NavlinkButton/NavlinkButton";
import NavButton from "../ButtonGeneral/ButtonGeneral";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";
import burgerIcon from "../../../assets/icons/burger-icon.svg";
import NavBarMobileMenu from "../../NavbarMobileMenu/NavbarMobileMenu";
import { useEffect, useState } from "react";

const Navbar: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem("user") || "{}");
	const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
	const navigate = useNavigate();
	useEffect(() => {
		data.firstName ? setIsUserLoggedIn(true) : setIsUserLoggedIn(false);
	}, []);
	return (
		<>
			<div className="all-navbar">
				<div className="navbar-left-side">
					<img src={logo} onClick={() => navigate("/")} className="logo-icon" />
					<Navlinkbutton name={"ShareSpace"} navigate="/ShareSpace" />
					<Navlinkbutton name={"Tips"} navigate="/Tips" />
					<NavBarMobileMenu />
				</div>
				{!isUserLoggedIn && (
					<div className="navbar-right-side">
						<NavButton
							name="LogIn"
							onClick={() => navigate(data.firstName ? "/userInfo" : "/LogIn")}
							class="log-in"
						/>
						<NavButton
							name="SignUp"
							onClick={() => navigate("/SignUp")}
							id="sign-up"
						/>
					</div>
				)}
				{isUserLoggedIn && (
					<div
						className="user-message"
						onClick={() => {
							navigate("/userInfo");
						}}>{`Hello, ${data.firstName}`}</div>
				)}
			</div>
		</>
	);
};

export default Navbar;
