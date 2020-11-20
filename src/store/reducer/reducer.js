import trackOne from "../../assets/audio/Whethan_StayForever.mp3";
import trackTwo from "../../assets/audio/Whethan_Superlove.mp3";
import trackThree from "../../assets/audio/Whethan_So_Good.mp3";
import trackFour from "../../assets/audio/Whethan_Good_Nights.mp3";

const initialState = {
  playBar: false,
  playMusic: false,
  trackId: null,
  trackVol: 0.5,
  musicCards: [
    {
      artist: "Whethan",
      album: "Stay Forever (Single)",
      track: "Stay Forever",
      albumArt: "https://www.whethan.com/images/stayforever.jpg",
      albumArtAlt: "Whethan - Stay Forever",
      trackSrc: trackOne,
      playing: false,
    },
    {
      artist: "Whethan",
      album: "life of a wallflower",
      track: "Superlove",
      albumArt: "https://www.whethan.com/images/Wheathanthumbail2.jpg",
      albumArtAlt: "Whethan - Superlove",
      trackSrc: trackTwo,
      playing: false,
    },
    {
      artist: "Whethan",
      album: "So Good (Single)",
      track: "So Good (feat. bülow)",
      albumArt:
        "https://direct.rhapsody.com/imageserver/images/alb.468083902/500x500.jpg",
      albumArtAlt: "Whethan - So Good",
      trackSrc: trackThree,
      playing: false,
    },
    {
      artist: "Whethan",
      album: "life of a wallflower",
      track: "Good Nights",
      albumArt:
        "https://static.qobuz.com/images/covers/25/22/0075679892225_600.jpg",
      albumArtAlt: "Whethan - Good Nights",
      trackSrc: trackFour,
      playing: false,
    },
  ],
};

const reducer = (state = initialState, action) => {
  const musicElArray = [];
  for (let key in musicElArray) {
    musicElArray.push({ id: key, config: state.musicCards[key] });
  }

  if (action.type === "TOGGLE_PLAY_BAR") {
    return {
      ...state,
      playBar: true,
      playMusic: true,
      trackId: state.musicCards,
    };
  }
  if (action.type === "TOGGLE_PLAY_PAUSE_ICON") {
    return {
      ...state,
      playMusic: !state.playMusic,
    };
  }
  if (action.type === "CHANGE_VOL") {
    return {
      ...state,
      trackVol: action.volume,
    };
  }
  return state;
};

export default reducer;
