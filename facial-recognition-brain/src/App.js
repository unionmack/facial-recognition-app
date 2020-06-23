import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: '4544842e77a4495489e8b822f577b619'
})

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 400
      }
    }
    }
  }


class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {}
    }
  }

  calculateFaceLocation = (data) => {

  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      calculateFaceLocation(response);

    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
      <Particles className="particles"
              params={particlesOptions}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl}/>
      {/*<Logo />
      // <ImageLinkForm />
  // <FaceRecognition />*/}
    </div>
    )
  }
}

export default App;