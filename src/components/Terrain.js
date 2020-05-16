import React from "react"
// Custom
import { SEA_LEVEL } from "../config/constants"

const Terrain = ({
  width, 
  height, 
  noise, 
  yCorner = 0, 
  xCorner = 0
}) => {
  const terrainChunks = []
  
  // Convert x and yCorner from pixles to terrainChunk positions
  let yLoopStart = Math.floor(yCorner / noise.terrainChunkSize)
  let xLoopStart = Math.floor(xCorner / noise.terrainChunkSize)
  let yLoopNumInterations = Math.round(height / noise.terrainChunkSize)
  let xLoopNumInterations = Math.round(width / noise.terrainChunkSize)

  for (let y = yLoopStart; y < yLoopNumInterations; y++) {
    for (let x = xLoopStart; x < xLoopNumInterations; x++) {
      
      let height = noise.heightMap[y][x]
      let fertility = noise.fertilityMap[y][x]
      let temperature = noise.temperatureMap[y][x]
      let cityness = noise.cityMap[y][x]
      
      terrainChunks.push(
        <TerrainChunk
          size={noise.terrainChunkSize}
          x={x * noise.terrainChunkSize}
          y={y * noise.terrainChunkSize}
          height={height}
          fertility={fertility}
          temperature={temperature}
          cityness={cityness}
        />
      )
    }
  }
  return(
      <div>
        {terrainChunks}
      </div>
    )
}

const TerrainChunk = ({x, y, height, fertility, temperature, cityness, size}) => {
  const grass = {color: "#86d987", zIndex: -90, boxShadow: null}
  const sand = {color: "#f0f2c9", zIndex: -89, boxShadow: "0px 0px 30px 10px #f0f2c9"}
  const snow = {color: "#e6edf0", zIndex: -88, boxShadow: "0px 0px 30px 10px #e6edf0"}
  const water = {color: "#78a4de", zIndex: -86, boxShadow: "0px 0px 10px 10px #78a4de"}
  const ice = {color: "#acd6e8", zIndex: -85, boxShadow: "0px 0px 10px 10px #acd6e8"}

  // Choose terrain type depending on noisemap
  let type = grass
  if(temperature > 0.5 || (height > SEA_LEVEL && height < -0.2)) type = sand
  if(height < SEA_LEVEL ) type = water
  if(temperature < -0.5){
    if(type === water) {
      type = ice 
    }else{
      type = snow
    }
  }

  // Only add box shadow to egdes
  let boxShadow = null
  if(height > SEA_LEVEL-0.2 && height < SEA_LEVEL+0.2) {
    if(type === water){
      boxShadow = water.boxShadow
    }
  }

  if(type === sand){
    if((temperature > 0.35 && temperature < 0.55) || (height > SEA_LEVEL-0.1 && height < -0.1)) boxShadow = sand.boxShadow
  }
  if(type === snow){
    if((temperature > -0.65 && temperature < -0.35)) boxShadow = snow.boxShadow
  }
  if(type === ice){
    if((temperature > -0.65 && temperature < -0.35) || height > SEA_LEVEL-0.2 && height < SEA_LEVEL+0.2) boxShadow = ice.boxShadow
  }

  return(
    <div style={{
      boxShadow: boxShadow,
      position: "absolute", 
      width: size + 16, 
      height: size + 16, 
      left: x + (Math.random()*5 +5) - 5, 
      top: y + (Math.random()*5 +5) - 5,
      backgroundColor: type.color,
      zIndex: type.zIndex,
      borderRadius: (Math.random() * 30 + 20) + "px"
    }}>
    </div>
  )
}

export default Terrain

/* FOR DEBUGGING HEIGHT AND FERTILITY
  <p style={{fontSize: 10, margin: 0, opacity: 0.5, zIndex: 20, position: "absolute"}}>
    {height.toFixed(2)}
  </p>
  <p style={{fontSize: 10, color: "darkgreen", margin: 0, opacity: 0.5, zIndex: 20, position: "absolute", top: 8}}>
    {fertility.toFixed(2)}
  </p>
*/