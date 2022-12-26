import React, { useState } from 'react'
import ItemListCategory from './ItemListCategory';
import "./Products.css";
import {v4} from 'uuid'
 function ListCategory({categories,setCategory}) {
  return (
    <ul className="categoryBox">
            {categories.map((cate) => (
              <ItemListCategory key={v4()} setCategory={() => setCategory(cate)} cate={cate.label}/>
            ))}
          </ul>
  )
}
export default ListCategory