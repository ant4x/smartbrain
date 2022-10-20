import React from "react"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particle from "./components/Particle/Particle"
import Signin from "./components/Signin/Signin"
import Register from "./components/Register/Register"
import Clarifai from "clarifai"
import './App.css'

window.process = {
  env: {
    NODE_ENV: 'development'
  }
}

function App() {

  const [input, setInput] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')
  const [box, setBox] = React.useState({})
  const [route, setRoute] = React.useState('signin')
  const [isSignedIn, setIsSignedIn] = React.useState(false)

  const app = new Clarifai.App({
    apiKey: "853a09fcb00b422880a34d3b21594cc5"
  })

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const onButtonSubmit = () => {
    setImageUrl(input)

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input
      )
      .then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err))
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <div className="App">
      <Particle />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {
        route === "home"
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === "signin"
              ? <Signin onRouteChange={onRouteChange} />
              : <Register onRouteChange={onRouteChange} />
          )
      }
    </div >
  )
}

export default App


