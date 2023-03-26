import '../Navbar/Navbar.css';
import Navlinkbutton from '../NavlinkButton/NavlinkButton';
import NavButton from '../ButtonGeneral/ButtonGeneral';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/icons/logo.svg';
import burgerIcon from '../../../assets/icons/burger-icon.svg';
import NavBarMobileMenu from '../../NavbarMobileMenu/NavbarMobileMenu';

const Navbar: React.FC = () => {
	const data = JSON.parse(sessionStorage.getItem('user') || '{}');
	const navigate = useNavigate();
	return (
		<>
			<div className="all-navbar">
				{/* <img src={logo} onClick={() => navigate("/")} className="logo-icon-mobile" /> */}
				<div className="navbar-left-side">
					<img
						src={logo}
						onClick={() => navigate('/')}
						className="logo-icon"
					/>
					<Navlinkbutton
						name={'ShareSpace'}
						navigate="/ShareSpace"
					/>
					<Navlinkbutton
						name={'Tips'}
						navigate="/Tips"
					/>
					<NavBarMobileMenu />
				</div>
				<div className="navbar-right-side">
					<NavButton
						name="LogIn"
						onClick={() => navigate(data.firstName ? '/userInfo' : '/LogIn')}
						class="log-in"
					/>
					<NavButton
						name="SignUp"
						onClick={() => navigate('/SignUp')}
						id="sign-up"
					/>
				</div>
			</div>
		</>
	);
};

export default Navbar;
