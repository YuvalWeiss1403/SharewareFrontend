import "../ConceptHero/ConceptHero.css"
import teamLogo from "../../assets/icons/team-icon.png"

const ConceptHero: React.FC = () => {
    return (
        <div className="concept-hero-container">
            <div className="sharing-caring-title"> Sharing Is Caring</div>     
            <div className="hero-content-container">
                <div className="platform-subtitle">Our Platform To Share Software</div>
                <div className="hero-circle c-line1" >
                    <div className="hero-content line1" >Asking Questions</div>
                </div>
                <div className="hero-circle c-line2" >
                <div className="hero-content line2">Sharing your Solutions</div>
                </div>
                <div className="hero-circle c-line3" >
                <div className="hero-content line3">Sharing Tips and Advices</div>
                </div>
            </div>
            <div id="input-modal" className="input-modal">
                <div className="input-container">
                <label id="input-empty-label">Search for subject</label>
                <input id="input" type="text" placeholder="Search for subject"/>
                <button id="search-button">Search</button>
                </div>
            </div>
        </div>
    )
}
    
    export default ConceptHero 