// Third party
import SimplexNoise from "simplex-noise"
// Custom 
import allProjectData from "./projectData"

const terrainChunkSize = 32
const entityMaxSize = 24

const generateNoiseMap = (inc, noiseMapYLen, noiseMapXLen) => {
  let noise = new SimplexNoise(Math.random())
  let noiseMap = []

  for (let y = 0; y < noiseMapYLen; y++) {
    noiseMap[y] = []
    for (let x = 0; x < noiseMapXLen; x++) {
      let value = noise.noise2D(y * inc, x * inc)
      noiseMap[y][x] = value
    }
  }
  return noiseMap
}

const getNoise = (noiseMapHeight, noiseMapWidth) => {
  const noiseMapYLen = Math.round(noiseMapHeight/terrainChunkSize)
  const noiseMapXLen = Math.round(noiseMapWidth/terrainChunkSize)
  const heightMapInc = 1/20
  const fertilityMapInc = 1/50
  const cityMapInc = 1/80

  // Create noisemaps
  let heightMap = generateNoiseMap(heightMapInc, noiseMapYLen, noiseMapXLen)
  let fertilityMap = generateNoiseMap(fertilityMapInc, noiseMapYLen, noiseMapXLen)
  let temperatureMap = generateNoiseMap(fertilityMapInc, noiseMapYLen, noiseMapXLen)
  let cityMap = generateNoiseMap(cityMapInc, noiseMapYLen, noiseMapXLen)
  let noise = {
    noiseMapHeight: noiseMapHeight,
    noiseMapWidth: noiseMapWidth,

    terrainChunkSize: terrainChunkSize, 
    entityMaxSize: entityMaxSize,

    heightMap: heightMap,
    fertilityMap: fertilityMap,
    temperatureMap: temperatureMap,
    cityMap: cityMap
  }

  // Terraform the noisemaps based on project biomes (projects should have clear background
  // with little to no noise so they can be read!)
  noise = terraform(noise)
  return noise
}

// If the project biome is ment to terraform the land around it
// change the noisemap accordingly
const terraform = (noise ) => {
  let editedNoise = noise
  for (let i = 0; i < allProjectData.length; i++) {
    const projectData = allProjectData[i]
    const startX = Math.floor(projectData.x / noise.terrainChunkSize)
    const startY = Math.floor(projectData.y / noise.terrainChunkSize)
    const adjustedWidth = Math.floor(projectData.width / noise.terrainChunkSize)
    const adjustedHeight = Math.floor(projectData.height / noise.terrainChunkSize)
    
    if(projectData.terraform !== undefined){   
       
      for (let y = startY; y < startY + adjustedHeight; y++) {
        for (let x = startX; x < startX + adjustedWidth; x++) {
          if(editedNoise.heightMap[y] !== undefined){
            for (let i = 0; i < projectData.terraform.length; i++) {
              let terraFormObj = projectData.terraform[i]
              // This value is smaller the closer we are to the 'egde' of our project biome it 
              // creates a fade between the project biome and the rest of the world
              let edgeValueModifier = getEdgeValueModifier(startX, startY, adjustedWidth, adjustedHeight, x, y);
              
              if(terraFormObj.type === "height"){       
                editedNoise.heightMap[y][x] += (terraFormObj.value * edgeValueModifier)
              }else if(terraFormObj.type === "fertility"){
                editedNoise.fertilityMap[y][x] += (terraFormObj.value * edgeValueModifier)
              }
            } 
          }
        }
      }
    }
  }
  return editedNoise
}


const getEdgeValueModifier = (startX, startY, adjustedWidth, adjustedHeight,  x, y) => {
  const amountOfFades = 4
  for (let i = 0; i < amountOfFades; i++) {
    if(x === startX + i || y === startY + i || x === startX + adjustedWidth - (i+1) || y === startY + adjustedHeight - (i+1)){
      //console.log("We are " + i + " away from egde, return opacity " + 0.06*Math.pow(i, 2));
      return 0.05*Math.pow(i, 2)
    }
  }
  return 1
}


export default getNoise