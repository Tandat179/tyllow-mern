import React, { useState } from 'react'

import "./Products.css";
function ItemListCategory({cate,setCategory}) {
    const [status,setStatus] = useState(false)
  return (
    <li style={{display : !status ? "block" : 'none'}}
                className="category-link"
                
                onClick={() => {
                    setStatus(!status)
                    setCategory();
                    
                }}
              >
                {cate}
              </li>
  )
}
export default ItemListCategory