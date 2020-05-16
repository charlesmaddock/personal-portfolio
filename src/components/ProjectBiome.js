import React from "react"

const ProjectBiome = ({ projectData, x, y, absolutePos=true, width=undefined }) => {
  let vegetationTypes = []
  for (let i = 0; i < projectData.emojis.length; i++) {
    vegetationTypes.push({emoji: projectData.emojis[i], spawnChance: 0.98, size: 20, minHeight: -3, maxHeight: 3, minFertility: -3, maxFertility: 3},)
  }

  return(
    <div style={{
      width: width !== undefined ?  width : projectData.width - 250, 
      position: "relative", 
      paddingLeft: 16,        
      position: absolutePos ? "absolute" : "static",
      left: absolutePos ? x : 0,
      top: absolutePos ? y : 0,
      padding: absolutePos ? "130px 130px 0 130px" : "0 0 20px 0",
      fontSize: 15,
    }}>
      {(projectData.title !== undefined && projectData.year !== undefined) && <Header projectData={projectData}/>}
      <div>
        {projectData.body}
      </div>
    </div>
  )
}

const Header = ({ projectData }) => (
  <div 
    style={{
      width: "100%", 
      flexDirection: "row", 
      display: "flex", 
      justifyContent: "space-between",
      marginBottom: -6
    }}
  > 
    <h3 style={{margin: 0}}>
      {projectData.title}
    </h3>
    <p style={{textAlign: "right", fontStyle: "italic", paddingTop: 6, margin: 0}}>
      {projectData.year}
    </p>
  </div>
)

export default ProjectBiome