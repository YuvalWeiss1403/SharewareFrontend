import react from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import "../DailyTip/DailyTip.css"

const DailyTip:React.FC = () => {
    const dispatch = useDispatch();
    const tips = useSelector((state:RootState) => state.tips.filteredValue)
    console.log(tips)

    // const getRandomTip = () => {
    //     if (tips && tips.length > 0) {
    //         const randomIndex = Math.floor(Math.random() * tips.length);
    //         console.log(randomIndex)
    //         return tips[randomIndex];
    //       } else {
    //         return null; 
    //       }
    // };

    return (
        <div className="daily-tip-container">
            <div className="daily-tip">
                <div>Our Daily Tip</div>

            </div>
        </div>
    )
}

export default DailyTip