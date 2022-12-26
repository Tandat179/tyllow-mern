import React from 'react'
import { Link } from 'react-router-dom';
import { OutlineButton } from '../button/Button';
import ListMovie from '../movie-list/ListMovie';
import "./home.css";

export default function Category({title,filter}) {
  return (
    <div className="section__header mb2">
    <h1>{title}</h1>
    <div className="section__header mb2">
      <Link to="/products">
        <OutlineButton className="small">View more</OutlineButton>
      </Link>
    </div>
    <br></br>
   <ListMovie filter={filter}/>
   

    <div className="section__header mb2"></div>
    <br></br>
  </div>
  )
}
