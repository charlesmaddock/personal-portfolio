import React from "react"

const Entity = ({ 
  emoji, 
  size, 
  x, 
  y, 
  scatter=false, 
  flip=true,
  style 
}) => {
  if(scatter){
    y += (Math.random() - 0.5) * 10
    x += (Math.random() - 0.5) * 10
  }
  let transform = flip && Math.random() > 0.5 ? "scale(-1, 1)" : null
  return(
    <div 
      style={{
        fontSize: size, 
        position: "absolute",
        zindex: 20,
        top: y,
        left: x,
        transform: transform,
        ...style
      }}
    >
      {emoji}
    </div>
  )
}

export default Entity