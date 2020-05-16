import React from "react"
// Custom 
import Entity from "./Entity"
import Road from "./Road"
import { SEA_LEVEL } from "../config/constants"


const defaultVegetationTypes = [
  {emoji: "🌳", size: 22, minHeight: 0.2, maxFertility: 0.4, minTemperature: -0.4, maxTemperature: 0.4},
  {emoji: "🌾", size: 14, minHeight: SEA_LEVEL-0.2, maxHeight: SEA_LEVEL, minTemperature: -0.4, maxTemperature: 0.4},
  {emoji: ["🌻","🌷", "🌺"], size: 14, minHeight: SEA_LEVEL+ 0.2, minFertility: 0, maxHeight: 0.4, minTemperature: -0.4, maxTemperature: 0.4},
  {emoji: ["🌱", "🌿"], size: 14, minHeight: SEA_LEVEL+ 0.3, minTemperature: -0.67, maxTemperature: 0.6},
  {emoji: "🏝️", spawnChance: 0.99, size: 32, maxHeight: SEA_LEVEL - 0.2, minHeight: -1},
  // Desert
  {emoji: "🌵", size: 14, minHeight: SEA_LEVEL + 0.3, minTemperature: 0.6, maxTemperature: 1},
  {emoji: "🌴", size: 22, minHeight: SEA_LEVEL + 0.1,  minTemperature: 0.5, maxTemperature: 1},
  {emoji: "🏜️", spawnChance: 0.9, size: 30, minHeight: 0.4, minTemperature: 0.5, maxTemperature: 1},

  // Snow
  {emoji: "🌲", size: 22, minHeight: SEA_LEVEL, minFertility: -1, maxFertility: 1, minTemperature: -1, maxTemperature: -0.3},
  {emoji: "🎄", spawnChance: 0.9, size: 26, minHeight: SEA_LEVEL, minFertility: -1, maxFertility: 1, minTemperature: -0.75, maxTemperature: -0.4},
  
  {emoji: "🏔️", spawnChance: 0.9, size: 30, minHeight: 0.4, minTemperature: -1, maxTemperature: -0.5},
  // Mountains
  {emoji: "🌋", spawnChance: 0.95, size: 32, minHeight: 0.4, minFertility: -1, maxFertility: 1},
  {emoji: "⛰️", spawnChance: 0.8, size: 30, minHeight: 0.4},
  {emoji: "🗿", spawnChance: 0.8, size: 22, minHeight: SEA_LEVEL + 0.3, maxHeight: 0.5, minFertility: -1, maxFertility: -0.8},
  // City
  {emoji: ["🏠", "🏡", "🏘️", "🚏"], size: 22, minHeight: SEA_LEVEL + 0.2, minCityness: 0.6, maxCityness: 1, minTemperature: -1, maxTemperature: 1},
  {emoji: ["🏬", "🏫", "🏢"], size: 28, minHeight: SEA_LEVEL + 0.2, minCityness: 0.69, maxCityness: 1, minTemperature: -1, maxTemperature: 1},
  {emoji: <Road/>, spawnChance: 0.7, size: 30, minHeight: SEA_LEVEL + 0.2, minCityness: 0.6, maxCityness: 1, minTemperature: -1, maxTemperature: 1},
  {emoji:["🚕", "🚗", "🚕", "🚗", "🚌", "🚚", "🚓", "🚒", "🚛"], spawnChance: 0.5, size: 16, minHeight: SEA_LEVEL + 0.2, minCityness: 0.6, maxCityness: 1, minTemperature: -1, maxTemperature: 1},
  {emoji: ["🚤", "⛴️", "🚢"], size: 18, minHeight: SEA_LEVEL - 0.2, maxHeight: SEA_LEVEL - 0.1, minCityness: 0.6, maxCityness: 1, minTemperature: 0.1, maxTemperature: 1},
]



const Vegetation = ({ 
  noise, 
  vegetationTypes = defaultVegetationTypes, 
  yCorner = 0, 
  xCorner = 0,
  height = 0,
  width = 0
}) => {
  const vegetation = []

  // Convert x and yCorner from pixles to terrainChunk positions
  let yLoopStart = Math.floor(yCorner / noise.entityMaxSize)
  let xLoopStart = Math.floor(xCorner / noise.entityMaxSize)
  let yLoopNumInterations = Math.floor(height / noise.entityMaxSize)
  let xLoopNumInterations = Math.floor(width / noise.entityMaxSize)

  for (let y = yLoopStart; y < yLoopNumInterations; y++) {
    for (let x = xLoopStart; x < xLoopNumInterations; x++) {
      // Since the serveral enitites can fit on one terrain chunk, we must adjust the
      // positions in the noise map we look at
      let adjustedY = Math.floor(y * (noise.entityMaxSize / noise.terrainChunkSize))
      let adjustedX = Math.floor(x * (noise.entityMaxSize / noise.terrainChunkSize))
      // Avoid array out of index error
      if(noise.heightMap[adjustedY] !== undefined){
        // Get values needed for checking if a enitiy can spawn or not
        let height = noise.heightMap[adjustedY][adjustedX]
        let fertility = noise.fertilityMap[adjustedY][adjustedX]
        let temperature = noise.temperatureMap[adjustedY][adjustedX]
        let cityness = noise.cityMap[adjustedY][adjustedX]
        // Choose three random vegetation entities
        const randomVegSelection = [
          vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
          vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
          vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
          vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
          vegetationTypes[Math.floor(Math.random()*vegetationTypes.length)],
        ]

        for (let i = 0; i < randomVegSelection.length; i++) {
          if(canSpawnVegetation(randomVegSelection[i], height, fertility, temperature, cityness)){
            let emoji = randomVegSelection[i].emoji
            // If there is an array of emojis, choose a random one
            if(Array.isArray(randomVegSelection[i].emoji)){
              emoji = randomVegSelection[i].emoji[Math.floor(Math.random() * randomVegSelection[i].emoji.length)]
            }
            vegetation.push(
              <Entity 
                emoji={emoji} 
                size={randomVegSelection[i].size}
                x={x * noise.entityMaxSize}
                y={y * noise.entityMaxSize}
                scatter={cityness > 0.5 ? false : true}
              />
            )
            break
          }
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

const canSpawnVegetation = (randomVeg, height, fertility, temperature, cityness) => {
  // Set default values if they are not already added
  if(randomVeg.maxHeight === undefined) randomVeg.maxHeight = 0.8
  if(randomVeg.maxFertility === undefined) randomVeg.maxFertility = 0.8
  if(randomVeg.minFertility === undefined) randomVeg.minFertility = -1
  if(randomVeg.spawnChance === undefined) randomVeg.spawnChance = 0.6
  if(randomVeg.maxTemperature === undefined) randomVeg.maxTemperature = 0.5
  if(randomVeg.minTemperature === undefined) randomVeg.minTemperature = -0.4
  if(randomVeg.maxCityness === undefined) randomVeg.maxCityness = 0.6
  if(randomVeg.minCityness === undefined) randomVeg.minCityness = -1

  // Check if the random vegetation can spawn at the current terrain chunk
  if(height > randomVeg.minHeight && 
     height < randomVeg.maxHeight && 
     fertility > randomVeg.minFertility &&
     fertility < randomVeg.maxFertility &&
     temperature > randomVeg.minTemperature &&
     temperature < randomVeg.maxTemperature &&
     cityness > randomVeg.minCityness &&
     cityness < randomVeg.maxCityness
  ){
    if(Math.random() > randomVeg.spawnChance){
      return true
    }
  }
  return false
  
}

export default Vegetation