import React from 'react'
import Item from "../../components/cards/items/items"
import "./main.css"
export default function Main() {
    return (
        <div className="main">
         <h2>Edvora</h2>
         <div className="product">
            <Item />
            <Item />
           <Item />
           <Item />
           <Item />
         </div>
          
        </div>
    )
}
