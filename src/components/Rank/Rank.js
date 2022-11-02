import React from "react"
import "./Rank.css"

const Rank = ({ name, entries }) => {
    return (
        <div>
            <h2 className="rank white f3">
                {`${name}, your current entry count is...`}
            </h2>
            <p className="rank white f1">
                {`#${entries}`}
            </p>
        </div>
    )
}

export default Rank