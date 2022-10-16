import React from "react"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particle from "./components/Particle/Particle"
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

  const app = new Clarifai.App({
    apiKey: "be5814c29aa845ea9ee93292d71e6635",
  });

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onButtonSubmit = () => {
    setImageUrl(input)

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        input
      )
      .then(
        function (response) {
          console.log(
            response.outputs[0].data.regions[0].region_info.bounding_box
          );
        },
        function (err) {
          console.log(err)
        }
      );
  };

  return (
    <div className="App">
      <Particle />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imageUrl={imageUrl} />
    </div >
  )
}

export default App


