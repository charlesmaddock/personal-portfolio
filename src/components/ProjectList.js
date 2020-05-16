import React from "react"
import ProjectBiome from "./ProjectBiome"

const projectListWidth = 420

const ProjectList = ({
  projectData, 
  setVisible,
  visible
}) => {
  if(visible == true){
    return (
      <div style={{
          position: "absolute", 
          left: 0, 
          top: 0, 
          marginTop: 30,
          background: "white", 
          zIndex: 100,
          padding: "20px 40px 20px 40px",
          borderRadius: "25px 18px 22px 21px"
        }}
      >
        <div style={{width: "100%", marginBottom: 20}}>
          <div 
            style={{cursor: "pointer", display: "inline-block"}}
            onClick={() => setVisible(false)}
          >
            X Close 
          </div>
        </div>
        {projectData.map( projectData => {
          if(projectData.showInProjectList !== false){
            return(
              <ProjectBiome 
                projectData={projectData}
                absolutePos={false}
                width={projectListWidth}
              />
            )
          }
        })}
      </div>
    )
  }else{
    return null
  }
}

export default ProjectList 