import React from "react"

const Entity = ({ 
  emoji, 
  size, 
  x, 
  y, 
  scatter=false, 
  style 
}) => {
  if(scatter){
    y += (Math.random() - 0.5) * 10
    x += (Math.random() - 0.5) * 10
  }
  return(
    <div 
      style={{
        fontSize: size, 
        position: "absolute",
        top: y,
        left: x,
        ...style
      }}
    >
      {emoji}
    </div>
  )
}

export default Entity