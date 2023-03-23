import "../HomePage/HomePage.css"
import Navbar from "../General/Navbar/Navbar"
import ConceptHero from "../ConceptHero/ConceptHero"

const HomePage: React.FC = () => {
return (
    <div className="home-page">
        <Navbar />
        <ConceptHero />
    </div>
)
}

export default HomePage 