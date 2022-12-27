import React from 'react'

export default function MyButton({children,style,onClick,className}) {
  return (
      <button className={`${className} myButton`} onClick={onClick} style={{padding : '5px 10px',transition : '0.5s ease', outline : 'none',borderRadius : '10px' ,color : 'white' , border : 'none',...style }}>
{children}
      </button>
  )
}
