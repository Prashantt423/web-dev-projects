import React from 'react'
import Leftbar from "../../components/leftbar/leftbar"
import Main from "../../components/main/main"
import "./homepage.css"
export default function Homepage() {
    return (
      <>
        <div className="homepage">
          <Leftbar/>
          <Main />
        </div>
      </>
    )
}
