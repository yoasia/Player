import React from 'react';
import ReactDOM from 'react-dom';
import ReactPlayer from 'react-player'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super();
    this.state = { 
        playlist: null,
        currentSongIndex:null
     };

     this.nextSong = this.nextSong.bind(this);
     this.prevSong = this.prevSong.bind(this);
     this.stop = this.stop.bind(this);
     this.play = this.play.bind(this);
  }

  componentWillMount(){
    axios
      .get('./src/constants/playlist.json')
      .then(({ data })=> {
      	this.setState({ 
            playlist: data, 
            currentSongIndex:0
        });
      })
      .catch((err)=> {
          console.log("Could not download playlist configuration.")
      })
  }

  nextSong(){
      let currentSongIndex = this.state.currentSongIndex + 1;

      if(currentSongIndex > this.state.playlist.length){
            currentSongIndex = 0;
      }

      this.setState({
        currentSongIndex
    });
  }

  prevSong(){}
  stop(){}
  play(){}

  render() {
      if(this.state.playlist){
        return (
            <div id="background" style={{
                "backgroundImage":'url('+this.state.playlist[this.state.currentSongIndex].background+')',
                "backgroundRepeat": "no-repeat"
            }}>
                <div id="ui" className="darker">
                    <ReactPlayer className="not-visible"
                    playing 
                    url={this.state.playlist[this.state.currentSongIndex].src}
                    config={{
                        file: {
                            autoplay:true
                            }
                        }}
                    onEnded={this.nextSong}
                    />
                    <svg width="100" height="100">
                        <circle cx="50%" cy="50%" r="500" stroke="white" stroke-width="4" fill="none" />
                        Sorry, your browser does not support inline SVG.
                    </svg> 
                </div>
            </div>
    );
      }
      else
        return null;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
export default App;
