import React, { useState, useEffect, useRef } from "react";
import { PlayButtonComponent } from "../play-button-component/play-button-component";
import "./style.css";

export function PlayerComponent({ title, artist, cover, source, duration }) {

    const audioRef = useRef(new Audio(source));
    const [play, setPlay] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const [trackProgressMinutes, setTrackProgressMinutes] = useState("0:00");

    useEffect(() => {
        if (play === true) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [play])

    useEffect(() => {
        setTrackProgressMinutes((trackProgress / 60).toFixed(2).toString().replace(".", ":"));
    }, [trackProgress])

    setInterval(() => {
        setTrackProgress(audioRef.current.currentTime);        
    }, [1000])

    function handlePlay() {
        setPlay(!play);
    }

    const onScrub = (value) => {
        // Clear any timers already running
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    }

    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`;

    return (
        <div className="player">
            <div>
                <img className="player_cover" src={cover} alt="capa" />
                <div className="player_info">
                    <p className="player_info_title">{title}</p>
                    <p className="player_info_artist">{artist}</p>
                </div>
            </div>
            <div className="player_controls">
                <div className="player_controls_button">
                    <PlayButtonComponent onClick={handlePlay} clicked={play} />
                </div>                
                <div className="player_controls_progress">
                    <p className="player_controls_progress_info">{trackProgressMinutes}</p>
                    <input
                        type="range"
                        value={trackProgress}
                        step="1"
                        min="0"
                        max={duration ? duration : `${duration}`}
                        className="progress"
                        onChange={(e) => onScrub(e.target.value)}
                        style={{ background: trackStyling }}
                    />
                    <p className="player_controls_progress_info">{duration}</p>
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}


