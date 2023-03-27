import react, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import "../DailyTip/DailyTip.css";
import userIcon from "../../assets/icons/user.svg"
import { NavLink } from "react-router-dom";
import NavigateIcon from "../../assets/icons/navigate-icon.png"

const DailyTip:React.FC = () => {
    const dispatch = useDispatch();
    const tips:any = useSelector((state:RootState) => state.tips.value)
    const getRandomTip = () => {
        if (tips && tips.length > 0) {
            const randomIndex = Math.floor(Math.random() * tips.length);
            const randomTip = tips[randomIndex]
            return randomTip;
          } else {
            return null; 
          }
    };
    const data = getRandomTip()
    window.onload = data;
    return (
        <div className="daily-tip-container">
            <div className="daily-tip">
                <div className="daily-tip-title">Our Daily Tip</div>
                <div className="tip-comment">
                    <div className="tip-content">{data.comment}</div>
                    <div className="circle-2"></div>
                    <div className="circle-3"></div>
                </div>
                <div className="tip-username">
                    <img src={userIcon} alt="user-icon" />
                    {data.username}
                </div>
                <div className="all-tips-container">
                    <NavLink
                    className={"all-tips-link"}
                        to={"/Tips"}>
                        Get All Tips 
                    </NavLink>
                    <img src={NavigateIcon} alt="navigate-icon" className="navigate-icon" />
                </div>
            </div>
            {/* <div className="circular-sb">
            {data.comment}
            <div className="circle1"></div>
            <div className="circle2"></div>
            </div>             */}
        </div>
        // <div className="daily-tip-container">
        //     <div className="daily-tip">
        //         <div className="daily-tip-title">Our Daily Tip</div>
        //         <div className="tip-comment">
        //             {data.comment}
        //         </div>
        //         <div className="tip-username">
        //             <img src={userIcon} alt="user-icon" />
        //             {data.username}
        //         </div>
        //         <div className="all-tips-container">
        //             <NavLink
        //             className={"all-tips-link"}
        //                 to={"/Tips"}>
        //                 Get All Tips 
        //             </NavLink>
        //             <img src={NavigateIcon} alt="navigate-icon" className="navigate-icon" />
        //         </div>
        //     </div>
        //     <div className="circular-sb">
        //     I'm Circular speech bubble
        //     <div className="circle1"></div>
        //     <div className="circle2"></div>
        //     </div>            
        // </div>
    )
}

export default DailyTip