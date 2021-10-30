import "./style.css";

export function PlayButtonComponent({onClick, clicked}){
    return <button className={`button ${clicked}`} onClick={onClick}></button>
}