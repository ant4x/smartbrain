import React from "react"
import Tilt from 'react-parallax-tilt';
import "./Logo.css"
import brain from "./brain.png"

const Logo = () => {
    return (
        <div className="ml5">
            <Tilt className="tilt br2 shadow-2">
                <img src={brain} alt="brain logo" />
            </Tilt>
        </div>
    )
}

export default Logo