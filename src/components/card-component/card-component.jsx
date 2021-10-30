import React, { useState, useEffect, useRef } from "react";
import { PlayButtonComponent } from "../play-button-component/play-button-component";
import "./style.css";

export function CardComponent({ title, artist, cover, source, duration }) {

    const audioRef = useRef(new Audio(source));
    const [isPlaying, setisPlaying] = useState(false);  

    useEffect(() => {
        if (isPlaying === true) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    function handlePlay() {
        setisPlaying(!isPlaying);
    }

    return (
        <div className="card">
            <div>
                <PlayButtonComponent onClick={handlePlay} clicked={isPlaying}/>
                <img className="card_cover" src={cover} alt="capa" />
                <div className="card_info">
                    <p className="card_info_title">{title}</p>
                    <p className="card_info_artist">{artist}</p>
                </div>
            </div>            
            <p className="card_duration">{duration}</p>
        </div>
    )
}


