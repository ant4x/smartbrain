import React from "react"
import Navigation from "./components/Navigation/Navigation"
import Logo from "./components/Logo/Logo"
import Rank from "./components/Rank/Rank"
import FaceRecognition from "./components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm"
import Particle from "./components/Particle/Particle"
import Signin from "./components/Signin/Signin"
import Register from "./components/Register/Register"
import "./App.css"

window.process = {
  env: {
    NODE_ENV: "development"
  }
}

function App() {

  const [input, setInput] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")
  const [box, setBox] = React.useState({})
  const [route, setRoute] = React.useState("signin")
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  const [user, setUser] = React.useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  })

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const loadUser = (data) => {
    const { id, name, email, entries, joined } = data
    setUser({
      id,
      name,
      email,
      entries,
      joined
    })
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById("inputImage")
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

  const onPictureSubmit = () => {
    setImageUrl(input)
    fetch("https://shrouded-harbor-48513.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("https://shrouded-harbor-48513.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              setUser(user => ({
                ...user,
                entries: count
              }))
            })
            .catch(console.log)
          displayFaceBox(calculateFaceLocation(response))
        }
      })
      .catch(err => console.log(err))
  }

  const returnToInitialState = () => {
    setInput("")
    setImageUrl("")
    setBox({})
    setRoute("signin")
    setIsSignedIn(false)
    setUser({
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: ""
    })
  }

  const onRouteChange = (route) => {
    if (route === "signout") {
      returnToInitialState()
    } else if (route === "home") {
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
            <Rank entries={user.entries} name={user.name} />
            <ImageLinkForm
              onInputChange={onInputChange}
              onPictureSubmit={onPictureSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            (route === "signin" || route === "signout")
              ? <Signin onRouteChange={onRouteChange} loadUser={loadUser} />
              : <Register onRouteChange={onRouteChange} loadUser={loadUser} />
          )
      }
    </div >
  )
}

export default App

//TODO: Refactor the code above with React Router