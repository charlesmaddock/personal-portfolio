import React from "react"
// Custom
import { SEA_LEVEL } from "../constants"

const Terrain = ({worldWidth, worldHeight, noise, solidColor }) => {
  const terrainChunks = []
  const terrainChunkMaxSize = 32

  for (let y = 0; y < worldHeight; y+=terrainChunkMaxSize) {
    for (let x = 0; x < worldWidth; x+=terrainChunkMaxSize) {

      let xHeightStep = x * noise.heightMapInc
      let yHeightStep = y * noise.heightMapInc
      let height = noise.heightMap.noise2D(xHeightStep, yHeightStep)

      let xFertilityStep = x * noise.fertilityMapInc
      let yFertilityStep = y * noise.fertilityMapInc
      let fertility = noise.fertilityMap.noise2D(xFertilityStep, yFertilityStep)
      
      terrainChunks.push(
        <TerrainChunk
          size={terrainChunkMaxSize}
          x={x}
          y={y}
          fertility={fertility}
          height={height}
          solidColor={solidColor}
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

const TerrainChunk = ({x, y, fertility, height, size, solidColor}) => {
  const grass = {color: "lightgreen", zIndex: -90, boxShadow: null}
  const sand = {color: "#f0f2c9", zIndex: -89, boxShadow: "0px 0px 30px 10px #f0f2c9"}
  const water = {color: "#5db9e3", zIndex: -88, boxShadow: "0px 0px 10px 10px #5db9e3"}
  const solid = {color: solidColor, zIndex: -87}

  // Choose terrain type depending on noisemap
  let type = grass
  if(fertility < -0.1 || (height > SEA_LEVEL && height < -0.2)) type = sand
  if(height < SEA_LEVEL) type = water
  if(solidColor !== undefined) type = solid

  // Only add border radiu
  let boxShadow = null
  if(type === water){
    if(height > SEA_LEVEL-0.2 && height < SEA_LEVEL+0.2) boxShadow = "0px 0px 10px 5px #5db9e3"
  }else if(type === sand){
    if(fertility > -0.25 && fertility < 0.2 || (height > SEA_LEVEL-0.1 && height < -0.1)) boxShadow = "0px 0px 30px 10px #f0f2c9"
  }

  let zIndex = type.zIndex

  /* CLIFFS
  if(height > 0.3) {
    boxShadow = "1px 5px 1px #9E9E9E";
    zIndex = -10
  }*/



  let randomBorderRadius = (Math.random() * 30 + 20) + "px " 

  return(
    <div style={{
      boxShadow: boxShadow,
      position: "absolute", 
      width: size + 16, 
      height: size + 16, 
      left: x + (Math.random()*5 +5) - 5, 
      top: y + (Math.random()*5 +5) - 5,
      backgroundColor: type.color,
      zIndex: zIndex,
      borderRadius: randomBorderRadius
    }}>

    </div>
  )
}

export default Terrain