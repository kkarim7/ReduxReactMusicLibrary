import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Spotlight.module.css";
import Card from "../../components/UI/Card/Card";
import PlayBar from "../../components/UI/PlayBar/PlayBar";

class Spotlight extends Component {
  playAudio = (key) => {
    let audio = document.getElementById(key);
    audio.play();
  };

  pauseAudio = (key) => {
    console.log(key);
    let audio = document.getElementById(key);
    audio.pause();
    this.props.onPauseClicked();
  };

  setVolume = (key) => {
    document.getElementById(key).volume = this.props.trackVol;
    localStorage.setItem("id", key);
  };

  render() {
    const musicElementsArray = [];

    for (let key in this.props.musicCards) {
      musicElementsArray.push({ id: key, config: this.props.musicCards[key] });
    }

    let cards = musicElementsArray.map((cardInfo) => (
      <Card
        key={cardInfo.id}
        clicked={() => {
          if (localStorage.getItem("id")) {
            this.pauseAudio(localStorage.getItem("id"));
            let track = document.getElementById(localStorage.getItem("id"));
            track.currentTime = 0;
          }
          this.props.onCardClicked(cardInfo.id);
          this.playAudio(cardInfo.id);
          this.setVolume(cardInfo.id);
        }}
      >
        <img src={cardInfo.config.albumArt} alt={cardInfo.config.albumArtAlt} />
        <small className={classes.SpotlightTrackInfo}>
          Artist: {cardInfo.config.artist}
        </small>
        <small className={classes.SpotlightTrackInfo}>
          Album: {cardInfo.config.album}
        </small>
        <small className={classes.SpotlightTrackInfo}>
          Track: {cardInfo.config.track}
        </small>
        <audio id={cardInfo.id} src={cardInfo.config.trackSrc}></audio>
      </Card>
    ));

    return (
      <div>
        <small className={classes.SpotlightRouteTitle}>Spotlight/</small>
        <p className={classes.SpotlightFeatured}>Featured Tracks</p>
        <div className={classes.Columns}>{cards}</div>
        {this.props.playCtrlBar ? (
          <PlayBar
            open={this.props.playCtrlBar}
            playing={this.props.playingAudio}
            trackId={musicElementsArray.id}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playCtrlBar: state.playBar,
    playingAudio: state.playMusic,
    musicCards: state.musicCards,
    trackId: state.trackId,
    trackVol: state.trackVol,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCardClicked: (id) => dispatch({ type: "TOGGLE_PLAY_BAR", id: id }),
    onPauseClicked: () => dispatch({ type: "TOGGLE_PLAY_PAUSE_ICON" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spotlight);
