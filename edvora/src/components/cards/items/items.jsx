import React from 'react'
import "./items.css"
export default function Items({ d }) {
    return (
        <div className="container">
            <div className="item">
                <div className="img">
                    <img src={d.image} alt="product-img" className="avatar" />
                    <h6 className="dim-color">{d.address.city},{d.address.state}</h6>
                </div>
                <div className="desc">
                    <h5 className="p-text">{d.product_name}</h5>
                    <h6 className="dim-color p-text">{d.brand_name}</h6>
                    <h6 className="p-text">${d.price}</h6>
                    <h6 className="p-text date dim-color">Date:{d.date.split("T")[0]}</h6>
                </div>

            </div>
            <div className="item">
                <h6 className="dim-color">{d.discription}</h6>
            </div>

        </div>
    )
}
