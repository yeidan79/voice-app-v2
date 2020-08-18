import React from 'react';
import './css/App.css';
import Menu from '../components/Menu';
import Card from '../components/Card';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

const initialState ={
  bt1: "Button 1!",
  bt2: "Button 2!",
  bt3: "Button 3!",
  bt1bool: true,
  bt2bool: true,
  bt3bool: true,
  contentfield: "Instructions: Click in any of the 3 buttons to go to their respective section "
  + "or activate the microphone below and spell slowly and clear any of the button's name.",
  imgrover1: '',
  imgrover2: '',
  photoday: '',
  descriptionday: '',
  climamars: '',
  str: ''
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = initialState;
    this.refphotoday = React.createRef();
    this.refrovers = React.createRef()
    this.refclimate = React.createRef()
    this.button1State = this.button1State.bind(this);
  }

  onMicStart = (st) =>  {
    const currentComponent = this;
    fetch('https://localhost:3001/api/speech-to-text/token')

    .then(function(response) {
      return response.json();
    })

    .then(function(token) {
      var stream = recognizeMic(Object.assign(token, {objectMode: false}));
        currentComponent.setState(
          (prevState => {
            return {
              str:stream
            };
          }),
          () => {
            console.log('heh',currentComponent.state.str)
            currentComponent.state.str.setEncoding('utf8');

            currentComponent.state.str.on('data', function(data) {
              currentComponent.setState(
                (prevState => {
                  return {
                    contentfield: data
                  };
                }),
                () => {
                  currentComponent.clickOnVoice(currentComponent.state.contentfield);
                });
            });

            currentComponent.state.str.on('error', function(err) {
              console.log(err);
            });
            }
          );

        }).catch(function(error) {
          console.log(error);
          });
  }

  clickOnVoice = (data) => {
    const datalower = data.toLowerCase();
    console.log(datalower);
    if((datalower.includes("photo of the day")) || (datalower.includes("photo of the day. "))){
      console.log(datalower);
      this.button1State();
    } else if((datalower.includes("curiosity rover")) || (datalower.includes("curiosity rover. "))){
      console.log(datalower);
      this.button2State();
    } else if((datalower.includes("mars climate")) || (datalower.includes("mars climate. "))){
      console.log(datalower);
      this.button3State();
    }
  }

  button1State = () => this.refphotoday.current.scrollIntoView({ behavior: 'smooth'})

  button2State = () => this.refrovers.current.scrollIntoView({ behavior: 'smooth'})

  button3State = () => this.refclimate.current.scrollIntoView({ behavior: 'smooth'})

  requestMars = (rover, sol) =>{//sol entre 1000 e 2000; rover: curiosity o opportunity
    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=1&api_key=DEMO_KEY`)
    .then(response => response.json())
    .then(image => {this.setState({
          imgrover1: image.photos[4].img_src,
          imgrover2: image.photos[20].img_src
       })
    });
  }

  requestPhotoDay = () => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
    .then(response => response.json())
    .then(photo => {this.setState({
          photoday: photo.url,
          descriptionday: photo.explanation
       })
    });
  }

  requestClimate = () => {
    fetch("https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0")
    .then(response => response.json())
    .then(data => {
      this.setState({
        climamars: data
      })
    });
  }


  componentDidMount(){
    this.requestMars('curiosity',Math.floor(Math.random() * (2000 - 1000 + 1) + 1000));
    this.requestPhotoDay();
    this.requestClimate();
  }


  render() {
    return (<div className="App">
      <section id="openingscreen" className="vh-100">
        <div className="flex items-center justify-center h-100 w-100">
          <h1 id="title" className="grow-large">
            Welcome to the greatest<br/>
            site<span> EVER </span><br/>
            about Mars!!!
          </h1>
        </div>
      </section>
      <section id="areacontexto" >
          <Menu>
            <button onClick={() => this.button1State()}
              className="f4 noborder ph3 pv2 mb2 dib white b colornaranja br3 w-20 h-10 pointer"
              >
              Photo of the day!
            </button>
            <button onClick={this.button2State}
              className="f4 noborder ph3 pv2 mb2 dib white b colornaranja br3 w-20 pointer"
              >
              Curiosity Rover!
            </button>
            <button onClick={this.button3State}
              className="f4 noborder ph3 pv2 mb2 dib white b colornaranja br3 w-20 pointer"
              >
              Mars Climate!
            </button>
          </Menu>

          <div className="pa4 vh-50 w-75 bg-white center br4 black b">
            {this.state.contentfield}
          </div>

          <Menu>
            <button onClick={this.onMicStart}
              className="f4 noborder ph3 pv2 mb2 dib white b colornaranja br3 pointer w-20"
            >
              Start Microphone
            </button>
            <button onClick={() => {this.state.str.stop(); this.setState({contentfield: ''});}}
              className=" w-20 f4 noborder ph3 pv2 mb2 dib white b colornaranja br3 pointer"
            >
              Stop Microphone
            </button>
          </Menu>
      </section>


      <section id="area1" className="fbg vh-100" ref={this.refphotoday}>

        <div className="flex items-center pa4 h-100">
          <div className="pa0 h-100 fixedflex center">
            <Card
              url={this.state.photoday}
              data=''
              />
          </div>
          <div className="h-100 fixedflex">
            <div className="flex items-center h-100 justify-center">
              <p className="pa3 f4 w-100 v-mid">{this.state.descriptionday}</p>
            </div>
          </div>
        </div>

      </section>

      <section id="area2" className="vh-100" ref={this.refrovers}>
        <div id="containerGrid">
          <div className="box h-100 w-100">
            <div className="fixedflex h-100 w-100">
              <Card
                url={this.state.imgrover2}
                data=''
                />
            </div>
          </div>
          <div className="box h-100 w-100">
            <p className="pa3 f1 w-75">This is a Curiosity Rover photo!</p>
          </div>
          <div className="box h-100 w-100">
            <p className="pa3 f1 w-75">Aaaaaand this is another one taken by Curiosity!</p>
          </div>
          <div className="box h-100 w-100">
            <div className="fixedflex h-100 w-100">
              <Card
                url={this.state.imgrover1}
                data=''
                />
            </div>
          </div>
        </div>
      </section>

      <section id="area3" className="vh-100" ref={this.refclimate}>
        <div className="flex w-100 h-100">
          <div className="days h-100 w-100">
            <Card
              data={this.state.climamars}
              sol='4'
              />
          </div>
          <div className="days h-100 w-100">
            <Card
              data={this.state.climamars}
              sol='5'
              />
          </div>
          <div className="days h-100 w-100">
            <Card
              data={this.state.climamars}
              sol='6'
              />
          </div>
        </div>
      </section>

    </div>);
  }
}

export default App;
