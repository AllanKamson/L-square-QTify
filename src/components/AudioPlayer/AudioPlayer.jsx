import React, { useState } from "react";
import styles from "./AudioPlayer.module.css";
import SongImage from "../../assets/SongImage.png";
import playPauseImage from "../../assets/pause.png";
import play from "../../assets/play.png"
import durationImage from "../../assets/length.png";

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    }

  return (
    <div className={styles.AudioPlayer}>
      {/* picture */}
      <div className={styles.AudioPlayer_image}>
        <img src={SongImage} alt="songImage" />
        <div className="AudioPlayer_image_heading">
          <h3>Song name</h3>
          <p>Album Name</p>
        </div>
      </div>
      {/* music player */}
      <div className={styles.player}>
        <img src={isPlaying ? play : playPauseImage} width="48px" height="48px" 
        alt={isPlaying ? play : playPauseImage} 
        className={styles.playPause} 
        onClick={togglePlayPause} />
        <div className={styles.duration}>
          <span className="startTime">0:38</span>
          <img src={durationImage} height="6px"  alt="durationImage" />
          <span className="endTime">3:38</span>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default AudioPlayer;