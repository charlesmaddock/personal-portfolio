import React from "react"
// Custom 
import Entity from "./Entity"

const vegetationTypes = [
  {emoji: "🌳", size: 22, minHeight: 0.2, maxHeight: 1, minFertility: 0, maxFertility: 1},
  {emoji: "🌾", size: 14, minHeight: -0.9, maxHeight: 0, minFertility: 0, maxFertility: 1},
  {emoji: "🌻", size: 12, minHeight: -0.95, maxHeight: 0.3, minFertility: 0, maxFertility: 1},
  {emoji: "🌷", size: 12, minHeight: -0.95, maxHeight: 0.3, minFertility: 0, maxFertility: 1},
  {emoji: "🌱", size: 14, minHeight: -0.9, maxHeight: 0, minFertility: 0, maxFertility: 1},
  {emoji: "🌵", size: 14, minHeight: -1, maxHeight: 1, minFertility: -1, maxFertility: -0.3},
  {emoji: "🌴", size: 22, minHeight: 0, maxHeight: 1, minFertility: -0.5, maxFertility: -0.1},
  {emoji: "🌲", size: 22, minHeight: 0.3, maxHeight: 1, minFertility: 0, maxFertility: 1},
]

const Vegetation = ({ worldWidth, worldHeight, noise }) => {
  const vegetation = []
  const vegetationMaxSize = 24

  for (let y = 0; y < worldHeight; y+=vegetationMaxSize) {
    for (let x = 0; x < worldWidth; x+=vegetationMaxSize) {

      let xHeightStep = x * noise.heightMapInc
      let yHeightStep = y * noise.heightMapInc
      let height = noise.heightMap.noise2D(xHeightStep, yHeightStep)

      let xFertilityStep = x * noise.fertilityMapInc
      let yFertilityStep = y * noise.fertilityMapInc
      let fertility = noise.fertilityMap.noise2D(xFertilityStep, yFertilityStep)
      console.log(fertility);
      
      const randomVegSelection = [
        vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
        vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
        {emoji: "  ", size: 24, minHeight: -1, maxHeight: 1, minFertility: -1, maxFertility: 1},
      ]

      for (let i = 0; i < randomVegSelection.length; i++) {
        if(canSpawnVegetation(randomVegSelection[i], height, fertility)){
          vegetation.push(
            <Entity 
              emoji={randomVegSelection[i].emoji} 
              size={randomVegSelection[i].size}
              x={x}
              y={y}
              scatter={true}
            />
          )
          break
        }
      }
    }
  }
  
  return(
    <div>
      {vegetation}
    </div>
  )
}

const canSpawnVegetation = (randomVeg, height, fertility) => {
  
  if(height > randomVeg.minHeight && 
     height < randomVeg.maxHeight && 
     fertility > randomVeg.minFertility &&
     fertility < randomVeg.maxFertility
  ){
    return true
  }
  return false
}

export default Vegetation