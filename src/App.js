// Third party
import React from "react"
import SimplexNoise from "simplex-noise"
// Custom
import Vegetation from "./components/Vegetation"
import Terrain from "./components/Terrain"

const worldHeight = 2000
const worldWidth = 2000

const noise = {
  heightMap: new SimplexNoise(Math.random()),
  heightMapInc: 1/600,
  fertilityMap: new SimplexNoise(Math.random()),
  fertilityMapInc: 1/800,
}

const projectData = [
  {
    title: "Winner of CASTIC",
    year: "2019",
    body: "I represented Sweden in Asia's largest research competition for youth and won gold aswell as the honorary 'President's Award' with my project about simulating ecosystems with AI. ",
    color: "lightgrey",
    width: 300,
    height: 200,
    emojis: ["💻", "👾", "🐜"]
  },
  {
    title: "Digital Ungdom",
    year: "2020",
    body: "I am currently a broad member in the youth organisation 'Digital Ungdom'. I have  participated in the creation of the organisation's website and online forum.",
    color: "lightblue",
    width: 300,
    height: 200,
    emojis: ["💻", "👨🏽‍💻", "🙋"]
  },
  {
    title: "Winner of CASTIC",
    year: "2019",
    body: "I represented Sweden in Asia's largest research competition for youth and won gold aswell as the honorary “President's Award” with my project about simulating ecosystems with AI. ",
    color: "pink",
    width: 300,
    height: 200,
    emojis: ["💻", "👾", "🐜"]
  }
]

const App = () => {
  let projects = []
  let i = 0
  const incY = worldHeight/2
  const incX = worldWidth/2
  for (let y = 0; y < worldHeight; y+=incY) {
    for (let x = 0; x < worldWidth; x+=incX) {
      if(i < projectData.length){
        projects.push(
          <ProjectBiome 
            projectData={projectData[i]}
            x={x + (Math.random() * incX)}
            y={y + (Math.random() * incY)}
          />
        )
        i++
      }
    }
  }
  return(
    <>
      <Welcome/>
      <div 
        style={{
          width: worldWidth, 
          height: worldHeight, 
          margin: 60,
          position: "relative"
        }}
      >
        <Terrain 
          worldWidth={worldWidth}
          worldHeight={worldHeight}  
          noise={noise}
        />
        <Vegetation 
          worldWidth={worldWidth}
          worldHeight={worldHeight}  
          noise={noise}
        />
        {projects}
      </div>
    </>
  )
}

const Welcome = () => (
  <div style={{display: "flex", alignItems: "flex-start", color: "darkgreen"}}>
    <div style={{marginLeft: 60, width: 360, display: "inline-block"}}>
      <h2>
        Welcome to my portfolio, 
      </h2>
      <p>
        Scroll around to explore and find
        projects and things I have done...
      </p>
      <p style={{fontSize: 13}}>
        Or just <span style={{textDecoration: "underline", cursor: "pointer"}} onClick={()=> alert("Haha just kidding you have to explore")}>press this link</span> to see a list,
        but that's pretty boring, <i>don't you agree?</i>
      </p>

    </div>
    <div style={{marginLeft: 20, width: 360, display: "inline-block"}}>
      <h2>
        Contact me:
      </h2>
      <p style={{margin: "4px 0 4px 0"}}>
        <b>Email:</b> CharlesAlexander.Maddock@gmail.com
      </p>
      <p style={{margin: "4px 0 4px 0"}}>
        <b>Instagram:</b> @charles.maddock
      </p>

    </div>
    <div style={{marginLeft: 20, width: 360, display: "inline-block"}}>
      <h2>
        Contribute:
      </h2>
      <p style={{margin: "4px 0 4px 0"}}>
        <b>Github:</b> https://github.com/charlesmaddock/personal-portfolio
      </p>
      <p style={{margin: "4px 0 4px 0"}}>
        <b>Issues:</b> https://github.com/charlesmaddock/personal-portfolio/issues
      </p>
    </div>
  </div>
)

const ProjectBiome = ({ projectData, x, y }) => {
  let vegetationTypes = []
  for (let i = 0; i < projectData.emojis.length; i++) {
    vegetationTypes.push({emoji: projectData.emojis[i], spawnChance: 0.98, size: 20, minHeight: -1, maxHeight: 1, minFertility: -1, maxFertility: 1},)
  }
  return(
    <div style={{
      width: projectData.width, 
      position: "relative", 
      paddingLeft: 16,        
      position: "absolute",
      left: x,
      top: y
    }}>
      <div 
        style={{
          width: "100%", 
          height: 30, 
          flexDirection: "row", 
          display: "flex", 
          justifyContent: "space-between",
  
        }}
      > 
        <h3>
          {projectData.title}
        </h3>
        <p style={{textAlign: "right", fontStyle: "italic", paddingTop: 6}}>
          {projectData.year}
        </p>
      </div>
      <div>
        <p>
          {projectData.body}
        </p>
      </div>
      <Terrain 
        worldWidth={projectData.width}
        worldHeight={projectData.height}  
        noise={noise}
        solidColor={projectData.color}
      />
      <Vegetation 
        worldWidth={projectData.width}
        worldHeight={projectData.height}  
        noise={noise}
        vegetationTypes={vegetationTypes}
      />
    </div>
  )
}

export default App