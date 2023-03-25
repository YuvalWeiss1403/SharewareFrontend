import React from "react"
import "../Footer/Footer.css"

const Footer: React.FC = ()=> {
    return (
        <footer id="footer-container" >
            <button className="contact-us footer-button">Contact us</button>
            <button className="terms footer-button">Term of Use</button>
            <button className="privacy footer-button">Privacy Policy</button>
        </footer>
    )
}
export default Footer