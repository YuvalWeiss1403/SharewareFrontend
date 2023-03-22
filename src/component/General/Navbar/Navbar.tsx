import "../Navbar/Navbar.css"
import Navlinkbutton from "../NavlinkButton/NavlinkButton"
import NavButton from "../ButtonGeneral/ButtonGeneral"
import { useNavigate } from "react-router-dom"

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    return (
    <div className="all-navbar">
        <div className="navbar-left-side">
            <Navlinkbutton name={"Logo"} navigate="/" /> 
            <Navlinkbutton name={"ShareSpace"} navigate="/" /> 
            <Navlinkbutton name={"Tips"} navigate="/" /> 
        </div>
        <div className="navbar-right-side">
            <NavButton name = "LogIn" onClick={() => navigate("/")} class="log-in" />
            <NavButton name = "SignUp" onClick={() => navigate("/")} id="sign-up" />
        </div>
    </div>
    )
}

export default Navbar
