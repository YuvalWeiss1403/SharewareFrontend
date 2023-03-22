import "../ButtonGeneral/ButtonGeneral.css"
import { IButtonGeneral } from "../../../interfaces"

const NavButton: React.FC<IButtonGeneral> = (props:IButtonGeneral) => {
    return (
        <>
            <button className={`buttonG ${props.class}`} onClick ={props.onClick} id={props.id} >
                    {props.name} 
                    <img src={props.src} alt={props.alt}/> 
            </button>
        </>
    )
}

export default NavButton