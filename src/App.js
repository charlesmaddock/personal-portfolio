// Third party
import React from "react"
import SimplexNoise from "simplex-noise"
// Custom
import Vegetation from "./components/Vegetation"

const worldHeight = 1000
const worldWidth = 1400

const noise = {
  heightMap: new SimplexNoise(Math.random()),
  heightMapInc: 1/300,
  fertilityMap: new SimplexNoise(Math.random()),
  fertilityMapInc: 1/800,
}

const App = () => {
  
  return(
    <div 
      style={{
        width: worldWidth, 
        height: worldHeight, 
        margin: 100,
        position: "relative"
      }}
    >
      <Vegetation 
        worldWidth={worldWidth}
        worldHeight={worldHeight}  
        noise={noise}
      />
    </div>
  )
}

export default App