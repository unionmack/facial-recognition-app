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
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
      // do something with response
      console.log(response);

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
      <FaceRecognition />
      {/*<Logo />
      // <ImageLinkForm />
  // <FaceRecognition />*/}
    </div>
    )
  }
}

export default App;