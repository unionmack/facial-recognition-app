import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation'
import Logo from './Components/Logo/Logo'
import Rank from './Components/Rank/Rank.js'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition.js'
import Register from './Components/Register/Register'
import SignIn from './Components/SignIn/SignIn'
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
      boxAll: [],
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaceAll = data.outputs[0].data.regions;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxArr = clarifaiFaceAll.map(region => {
      return (
        {
          leftCol :  region.region_info.bounding_box.left_col * width,
          topRow :  region.region_info.bounding_box.top_row * height,
          rightCol : width - (region.region_info.bounding_box.right_col * width),
          bottomRow : height - (region.region_info.bounding_box.bottom_row * height)
        }
      )
    });
    return boxArr;
  }

  displayFaceBox = (boxAll) => {
    this.setState({boxAll: boxAll});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  ;
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
      <Particles className="particles"
              params={particlesOptions}
            />
      <Navigation onRouteChange={this.onRouteChange}/>
      {this.state.route === 'home' 
        ? <div>
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition 
        imageUrl={this.state.imageUrl} 
        boxAll={this.state.boxAll}/> 
      </div>
        : (
          this.state.route === "signin"
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>
        )
        }
    </div>
    )
  }
}

export default App;