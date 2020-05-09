import React from "react"
// Custom
import { SEA_LEVEL } from "../constants"

const Terrain = ({worldWidth, worldHeight, noise, solidColor }) => {
  const terrainChunks = []
  const terrainChunkMaxSize = 24

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
  const grass = {color: "lightgreen", zIndex: -4}
  const sand = {color: "#f0f2c9", zIndex: -3}
  const water = {color: "#5db9e3", zIndex: -2}
  const solid = {color: solidColor, zIndex: -1}

  let type = grass
  if(fertility < -0.1 || (height > SEA_LEVEL && height < -0.2)) type = sand
  if(height < SEA_LEVEL) type = water
  if(solidColor !== undefined) type = solid

  let randomBorderRadius = (Math.random() * 30 + 10) + "px " 

  return(
    <div style={{
      position: "absolute", 
      width: size + (Math.random()*10 +10), 
      height: size + (Math.random()*10 +10), 
      left: x, 
      top: y,
      backgroundColor: type.color,
      zIndex: type.zIndex,
      borderRadius: randomBorderRadius
    }}>

    </div>
  )
}

export default Terrain