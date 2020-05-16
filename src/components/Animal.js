import React, {useState, useEffect} from "react"
// Custom
import Entity from "./Entity"

const ANIMAL_SIZE = 32
const SPEED = 3

const Animal = ({ 
  emoji, 
  x, 
  y, 
  mode = "random"
}) => {
  let [xPos, setXPos] = useState(x * ANIMAL_SIZE)
  let [yPos, setYPos] = useState(y * ANIMAL_SIZE)
  let [direction, setDirection] = useState(Math.random() * 359)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if(mode === "random"){
        setXPos(xPos => xPos * Math.cos(Math.PI * direction / 180) - yPos * Math.sin(Math.PI * direction / 180))
        setYPos(yPos => xPos * Math.sin(Math.PI * direction / 180) + yPos * Math.cos(Math.PI * direction / 180))
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return(
    <Entity 
      emoji={emoji} 
      size={ANIMAL_SIZE}
      flip={false}
      x={xPos}
      y={yPos}
      style={{zIndex: 10}}
    />
  )
}

export default Animal