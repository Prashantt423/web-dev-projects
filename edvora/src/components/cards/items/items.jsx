import React from 'react'
import "./items.css"
export default function Items() {
    return (
        <div className="container">
            <div className="item">
              <div className="img">
                <img src="https://png.pngtree.com/png-clipart/20190920/original/pngtree-chemical-glass-product-illustration-png-image_4626884.jpg" alt="product-img" className="avatar" />
                <h6 className="dim-color">Location</h6> 
              </div>
                <div className="desc">
                    <h5 className="p-text">Product Name</h5>
                    <h6 className="dim-color p-text">Brand Name</h6>
                    <h6 className="p-text">$29.90</h6>
                    <h6 className="date dim-color">Date:26.10.2017</h6>
                </div>
                
            </div>
          
            <div className="item">
                <h6 className="dim-color">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, inventore.</h6>
            </div>

        </div>
    )
}
