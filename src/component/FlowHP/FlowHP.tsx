import "../FlowHP/FlowHP.css"
import recognitionIcon from "../../assets/images/icon-brand-recognition.svg"
import detailsIcon from "../../assets/images/icon-detailed-records.svg"
import customizableIcon from "../../assets/images/icon-fully-customizable.svg"

const FlowHP: React.FC = () => {
    return (
        <div className="all-flow-container">
            <div className="all-flow-dashboard">
                <hr/>
                <div className="brand-recognition-container">
                    <span>1</span>
                    <div className="brand-recognition-content">
                        <div className="heading">Home Page</div>
                    </div>
                </div>
                <div className="detailed-records-container">
                    <span>2</span>
                    <div className="detailed-records-content">
                        <div className="heading">All Sharespace</div>
                    </div>
                </div>
                <div className="fully-customizable-container">
                    <span>3</span>
                    <div className="fully-customizable-content">
                    <div className="heading">Tips And Advices</div>
                    </div>
                </div> 
            </div>
        </div>
    )
}


export default FlowHP