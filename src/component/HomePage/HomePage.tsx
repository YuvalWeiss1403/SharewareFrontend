import "../HomePage/HomePage.css"
import Navbar from "../General/Navbar/Navbar"
import ConceptHero from "../ConceptHero/ConceptHero"
import FlowHP from "../FlowHP/FlowHP"

const HomePage: React.FC = () => {
return (
    <div className="home-page">
        <Navbar />
        <ConceptHero />
        <FlowHP />
    </div>
)
}

export default HomePage 