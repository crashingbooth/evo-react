import * as Tone from "tone";

const resourceBaseUrl = "https://raw.githubusercontent.com/crashingbooth/static-step-sequencer/main/"
const resources = {
  kick1: {
    filename: "audio/kick.mp3",
    displayName: "kick 1"
  },
  kick2: {
    filename: "audio/kick1.wav",
    displayName: "kick 2"
  },
  hh1: {
    filename: "audio/hh.wav",
    displayName: "hh 1"
  },
  rim1: {
    filename: "audio/rim2.wav",
    displayName: "rim 1"
  },
  tom1: {
    filename: "audio/tom.wav",
    displayName: "tom 1"
  },
  snare1: {
    filename: "audio/snare3.wav",
    displayName:  "snare 1"
  }
}

const audioResources = Object.values(resources).map ((res) => {
      const synth = new Tone.Sampler({
         urls: {	C3: res.filename },
         baseUrl: resourceBaseUrl}).toDestination();
      return {
        synth: synth,
        displayName: res.displayName
    }
  }
  )


export {audioResources};
