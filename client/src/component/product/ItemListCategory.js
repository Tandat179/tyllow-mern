import React, { useState } from 'react'

import "./Products.css";
export default function ItemListCategory({cate,setCategory}) {
    const [status,setStatus] = useState(false)
  return (
    <li style={{border : status ? "1px solid white" : 'none'}}
                className="category-link"
                key={cate}
                onClick={() => {
                    setCategory();
                    setStatus(!status)
                }}
              >
                {cate}
              </li>
  )
}
