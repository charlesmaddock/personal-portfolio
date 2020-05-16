// Third party
import React, {useEffect} from "react"
// Custom components
import Vegetation from "./components/Vegetation"
import ProjectList from "./components/ProjectList"
import Terrain from "./components/Terrain"
import Animal from "./components/Animal"
import ProjectBiome from "./components/ProjectBiome"
// Custom data/config
import getNoise from "./config/noise"
import projectData from "./config/projectData"
import {WORLD_HEIGHT, WORLD_WIDTH} from "./config/constants"

const noise = getNoise(WORLD_HEIGHT, WORLD_WIDTH)

const App = () => {
  let projects = []
  for (let i = 0; i < projectData.length; i++) {
    projects.push(
      <ProjectBiome 
        projectData={projectData[i]}
        x={projectData[i].x}
        y={projectData[i].y}
      />
    )
  }

  // Scroll to the center of the world when website is opened
  useEffect(() => {
    window.scroll(WORLD_WIDTH/2 - window.innerWidth/2, WORLD_HEIGHT/2 - window.innerHeight/2)
  })

  return(
    <div>
      <div 
        style={{
          margin: -20,
          width: noise.WORLD_WIDTH, 
          height: noise.WORLD_HEIGHT, 
          position: "relative"
        }}
      >
        <Animal
          x={10}
          y={10}
          emoji="🐉"
        />
        <Terrain 
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}  
          noise={noise}
        />
        <Vegetation 
          width={WORLD_WIDTH}
          height={WORLD_HEIGHT}  
          noise={noise}
        />
        {projects}
      </div>
    </div>
  )
}


export default App