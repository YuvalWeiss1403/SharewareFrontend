import "../FlowHP/FlowHP.css"

const FlowHP: React.FC = () => {
    return (
        <div className="all-flow-container">
            <div className="all-flow-dashboard">
                <hr/>
                <div className="home-page-container">
                    <span>1</span>
                    <div className="home-page-content">
                        <div className="heading">Home Page</div>
                    </div>
                </div>
                <div className="all-shareSpace-container">
                    <span>2</span>
                    <div className="all-shareSpace-content">
                        <div className="heading">All ShareSpace</div>
                    </div>
                </div>
                <div className="tips-container">
                    <span>3</span>
                    <div className="tips-content">
                    <div className="heading">Tips And Advices</div>
                    </div>
                </div> 
            </div>
        </div>
    )
}


export default FlowHP