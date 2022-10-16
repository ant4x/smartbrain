import React from "react"
import "./ImageLinkForm.css"

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div>
            <p className="f3 white">
                {"This magic brain will detect faces in your pictures. Give it a try!"}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5 z-1">
                    <input className="f4 pa2 w-70 center input-detect" type="text" onChange={onInputChange} />
                    <button className="btn-detect w-30 f4 ph3 pv2 white" onClick={onButtonSubmit}>DETECT</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm