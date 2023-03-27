import "../FlowHP/FlowHP.css";

const FlowHP: React.FC = () => {
	return (
		<div className="all-flow-container">
			<div className="all-flow-dashboard">
				<hr />
				<div className="home-page-container">
					<span>?</span>
					<div className="home-page-content">
						<div className="heading">Asking Questions</div>
						<div className="flow-box-content">
							Working on a share space where you can answer team mates questions
						</div>
					</div>
				</div>
				<div className="all-shareSpace-container">
					<span>@</span>
					<div className="all-shareSpace-content">
						<div className="heading">Sharing your Solutions</div>
						<div className="flow-box-content">
							Uploading questions that will be connected to a specific subject
							to help you look it up after{" "}
						</div>
					</div>
				</div>
				<div className="tips-container-hp">
					<span>$</span>
					<div className="tips-content-hp">
						<div className="heading">Sharing Tips and Advices</div>
						<div className="flow-box-content">
							Sharing your tips and advices with your friends
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlowHP;
