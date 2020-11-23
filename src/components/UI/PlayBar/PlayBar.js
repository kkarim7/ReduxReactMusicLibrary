import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import classes from "./PlayBar.module.css";

const PlayBar = (props) => {
  let attachedClasses = [];
  if (props.open) {
    attachedClasses = [classes.PlayBar, classes.OpenPlayBar];
  } else {
    attachedClasses = [classes.PlayBar, classes.ClosePlayBar];
  }

  const playPauseHandler = (key) => {
    let audio = document.getElementById(key);
    audio.pause();
    props.onPauseClicked();
    //change playing state to false
  };

  const playContinueHandler = (key) => {
    let audio = document.getElementById(key);
    audio.play();
    props.onCardClicked(key);
  };

  const setVolume = () => {
    let trackId = localStorage.getItem("id");
    let selectedTrack = document.getElementById(trackId);
    selectedTrack.volume = props.trackVol;
  };

  let trackDuration = document.getElementById(localStorage.getItem("id"))
    .duration;

  let trackCurrentTime = document.getElementById(localStorage.getItem("id"))
    .currentTime;

  const setTrackTime = () => {
    let trackId = localStorage.getItem("id");
    let selectedTrack = document.getElementById(trackId);
    selectedTrack.currentTime = props.trackTime;
  };

  const [currSec, setCurrSec] = useState();

  useEffect(() => {
    setTimeout(() => {
      setCurrSec(trackCurrentTime);
    }, trackDuration);
  }, [trackCurrentTime, trackDuration]);

  let currentTime;
  if (trackCurrentTime !== 0) {
    currentTime = new Date(currSec * 1000).toISOString().substr(14, 5);
  }

  let duration = new Date(trackDuration * 1000).toISOString().substr(14, 5);

  const setPrevTrack = () => {
    let trackId = localStorage.getItem("id");
    if (trackId === "0") {
      document.getElementById(trackId).currentTime = 0;
      return;
    }
    if (document.getElementById(trackId).paused) {
      props.onPauseClicked();
    }
    let audioTrack = document.getElementById(trackId);
    audioTrack.pause();
    let keepAudioVol = audioTrack.volume;
    let prevTrackId = parseInt(trackId) - 1;
    localStorage.setItem("id", prevTrackId);
    let prevAudioTrack = document.getElementById(prevTrackId);
    prevAudioTrack.currentTime = 0;
    prevAudioTrack.volume = keepAudioVol;
    prevAudioTrack.play();
  };

  const setNextTrack = () => {
    let trackId = localStorage.getItem("id");
    let fullAudioList = document.querySelectorAll("audio").length;
    if (fullAudioList - 1 === parseInt(trackId)) {
      document.getElementById(trackId).currentTime = trackDuration;
      props.onPauseClicked();
      return;
    }
    if (document.getElementById(trackId).paused) {
      props.onPauseClicked();
    }
    let audioTrack = document.getElementById(trackId);
    audioTrack.pause();
    let keepAudioVol = audioTrack.volume;
    let nextTrackId = parseInt(trackId) + 1;
    localStorage.setItem("id", nextTrackId);
    let nextAudioTrack = document.getElementById(nextTrackId);
    nextAudioTrack.currentTime = 0;
    nextAudioTrack.volume = keepAudioVol;
    nextAudioTrack.play();
  };

  return (
    <footer>
      <div className={attachedClasses.join(" ")}>
        <small>
          {props.playing ? (
            <div className={classes.AudioControlsContainer}>
              <div className={classes.AudioControlIcons} onClick={setPrevTrack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z" />
                </svg>
              </div>
              <div
                className={classes.AudioControlIcons}
                onClick={() => {
                  playPauseHandler(localStorage.getItem("id")); //musicElementsArray[0].id
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M8 19c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2v10c0 1.1.9 2 2 2zm6-12v10c0 1.1.9 2 2 2s2-.9 2-2V7c0-1.1-.9-2-2-2s-2 .9-2 2z" />
                </svg>
              </div>
              <div className={classes.AudioControlIcons} onClick={setNextTrack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              </div>
              <i style={{ marginLeft: "20px" }} className={classes.VolumeIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L9 9H6c-.55 0-1 .45-1 1z" />
                </svg>
              </i>
              <div>
                <input
                  className={classes.VolumeSliderInput}
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  type="range"
                  value={props.trackVol}
                  onChange={(e) => {
                    setVolume();
                    props.onVolChange((+e.target.value).toFixed(2));
                  }}
                />
              </div>
              <i className={classes.VolumeIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z" />
                </svg>
              </i>
              <div>
                <input
                  className={classes.AudioSlider}
                  min="0"
                  max={trackDuration}
                  step="0.1"
                  type="range"
                  value={
                    document.getElementById(localStorage.getItem("id"))
                      .currentTime
                  }
                  onChange={(e) => {
                    setTrackTime();
                    props.onTrackTimeChange(+e.target.value);
                  }}
                />
              </div>
              <div className={classes.AudioSliderDuration}>
                <small>
                  {window.outerWidth < 500
                    ? currentTime
                    : currentTime + " / " + duration}
                </small>
              </div>
            </div>
          ) : (
            <div className={classes.AudioControlsContainer}>
              <div className={classes.AudioControlIcons} onClick={setPrevTrack}>
                <svg viewBox="0 0 24 24" fill="grey">
                  <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z" />
                </svg>
              </div>
              <div
                className={classes.AudioControlIcons}
                onClick={() => {
                  playContinueHandler(localStorage.getItem("id")); //musicElementsArray[0].id
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                </svg>
              </div>
              <div className={classes.AudioControlIcons} onClick={setNextTrack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z" />
                </svg>
              </div>
              <i style={{ marginLeft: "20px" }} className={classes.VolumeIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L9 9H6c-.55 0-1 .45-1 1z" />
                </svg>
              </i>
              <div>
                <input
                  className={classes.VolumeSliderInput}
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  type="range"
                  value={props.trackVol}
                  onChange={(e) => {
                    setVolume();
                    props.onVolChange((+e.target.value).toFixed(2));
                  }}
                />
              </div>
              <i className={classes.VolumeIcons}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="grey"
                >
                  <path d="M3 10v4c0 .55.45 1 1 1h3l3.29 3.29c.63.63 1.71.18 1.71-.71V6.41c0-.89-1.08-1.34-1.71-.71L7 9H4c-.55 0-1 .45-1 1zm13.5 2c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 4.45v.2c0 .38.25.71.6.85C17.18 6.53 19 9.06 19 12s-1.82 5.47-4.4 6.5c-.36.14-.6.47-.6.85v.2c0 .63.63 1.07 1.21.85C18.6 19.11 21 15.84 21 12s-2.4-7.11-5.79-8.4c-.58-.23-1.21.22-1.21.85z" />
                </svg>
              </i>
              <div>
                <input
                  className={classes.AudioSlider}
                  min="0"
                  max={trackDuration}
                  step="0.1"
                  type="range"
                  value={
                    document.getElementById(localStorage.getItem("id"))
                      .currentTime
                  }
                  onChange={(e) => {
                    setTrackTime();
                    props.onTrackTimeChange(+e.target.value);
                  }}
                />
              </div>
              <div className={classes.AudioSliderDuration}>
                <small>
                  {window.outerWidth < 500
                    ? currentTime
                    : currentTime + " / " + duration}
                </small>
              </div>{" "}
              {/* THIS IS FOR THE SEEK BAR */}
            </div>
          )}
        </small>
      </div>
    </footer>
  );
};

const mapStateToProps = (state) => {
  return {
    musicCards: state.musicCards,
    playingAudio: state.playMusic,
    audioDuration: state.trackDuration,
    trackId: state.trackId,
    trackVol: state.trackVol,
    playBar: state.playBar,
    trackTime: state.trackTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: (id) => dispatch({ type: "TOGGLE_PLAY_BAR", id: id }),
    onPauseClicked: () => dispatch({ type: "TOGGLE_PLAY_PAUSE_ICON" }),
    onVolChange: (vol) => dispatch({ type: "CHANGE_VOL", volume: vol }),
    onTrackTimeChange: (time) =>
      dispatch({ type: "CHANGE_CURRENT_TIME", time: time }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayBar);
