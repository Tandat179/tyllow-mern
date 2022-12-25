import React from 'react'
import ItemListCategory from './ItemListCategory';
import "./Products.css";

export default function ListCategory({categories,setCategory,category,setLoading}) {
  return (
    <ul className="categoryBox">
            {categories.map((cate) => (
              <ItemListCategory setCategory={() => {
                  if (cate === "All") {
                    setCategory("");
                  } else {
                    category === "" ? setCategory(cate) : setCategory(`${category}|${cate}`)
                  }
                  setLoading(true);
                }} cate={cate}/>
            ))}
          </ul>
  )
}
