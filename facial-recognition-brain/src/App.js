import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Particles from 'react-particles-js'

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
  render() {
    return (
      <div className="App">
      <Particles className="particles"
              params={particlesOptions}
            />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<Logo />
      // <ImageLinkForm />
  // <FaceRecognition />*/}
    </div>
    )
  }
}

export default App;