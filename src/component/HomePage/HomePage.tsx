import "../HomePage/HomePage.css"
import Navbar from "../General/Navbar/Navbar"
import ConceptHero from "../ConceptHero/ConceptHero"
import FlowHP from "../FlowHP/FlowHP"
import Footer from "../General/Footer/Footer"
import DailyTip from "../DailyTip/DailyTip"

const HomePage: React.FC = () => {
return (
    <div className="home-page">
        <Navbar />
        <ConceptHero />
        <DailyTip />
        <FlowHP />
        <Footer />
    </div>
)
}

export default HomePage 