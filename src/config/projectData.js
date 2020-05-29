import React, {useState} from "react"
// Custom
import Welcome from "../components/Welcome"
import StyledLink from "../components/StyledLink"
import {WORLD_WIDTH, WORLD_HEIGHT} from "./constants"

const projectData = [
  {
    title: "Digital Ungdom",
    year: "2020",
    body: (
      <>
        <p>
          I am currently a board member in the youth organisation 'Digital Ungdom' in 
          which I have also actively participated in the creation of the organisation's 
          website and online forum.
        </p>
        <StyledLink title="digitalungdom.se" href="https://digitalungdom.se/"/>  
        <StyledLink title="See the project on GitHub" href="https://github.com/digitalungdom-se/digitalungdom.se"/>  
        
      </>      
    ),
    width: 600,
    height: 500,
    x: "randomize",
    y: "randomize",
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👨🏽‍💻", "🙋"]
  },
  {
    title: "Rivernotch",
    year: "2020",
    body: (
      <>
        <p>
          Rivernotch is a open world multiplayer game which I founded and am lead developer to. 
          All players connect to the same server so they can fight, explore and have fun
          together in real time, in a procedurally generated world!
        </p>
        <p>
          To make this project I created a dedicated Nodejs TCP server from scratch 
          with it's own, quite unique, world generation and crafting algoritms. The client uses Unity but is
          also a code heavy project (C#), since a lot of logic is needed for receiving and sending
          packets in a optimized fashion.
        </p>
        <StyledLink title="Download at rivernotch.com" href="https://rivernotch.com/"/>  
      </>      
    ),
    width: 600,
    height: 610,
    x: "randomize",
    y: "randomize",
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👨🏽‍💻", "🙋"]
  },
  {
    title: "CTO at CLMTE",
    year: "2020",
    body: (
      <>
        <p>
          I am currently chief technology officer at the start up company 'CLMTE' 
          which seeks to bring carbon offsetting to the general public. 
        </p>
        <p>
          I developed the company's mobile application and website and also play 
          an active role in the overall development the company.
        </p>
        <StyledLink title="clmte.com" href="https://www.clmte.com//">  
      </>      
    ),
    width: 600,
    height: 500,
    x: "randomize",
    y: "randomize",
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👨🏽‍💻", "🙋"]
  },
  {
    title: "Winner of international competition 'CASTIC'",
    year: "2019",
    body: (
      <>
        <p>
          I represented Sweden in Asia's largest research competition for youth 
          and won gold aswell as the honorary 'President's Award' with my project
          about simulating ecosystems with AI. 
        </p>
        <StyledLink title="Read my thesis paper" href="Cambrians.pdf"/>  
        <StyledLink title="See the official Swedish press release" href="https://ungaforskare.se/2019/07/29/stor-succe-for-sveriges-unga-forskningslandslag-i-kina/"/>  
      </>
    ),
    width: 710,
    height: 500,
    x: "randomize",
    y: "randomize",
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👾", "🐜"]
  },
  {
    title: "When in Rome",
    year: "2018",
    body: (
      <>
        <p>
          I made a animated short film in Adobe Flash and published it to youtube.
        </p>
        <StyledLink title="See the film on youtube" href="https://www.youtube.com/watch?v=COWzqM8ieWE"/>  
      </>      
    ),
    width: 520,
    height: 440,
    x: "randomize",
    y: "randomize",
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👨🏽‍💻", "🙋"]
  },
  {
    title: "Welcome",
    body: null, // Special case where body is added later in the addWelcomeComponent function
    width: 1400,
    height: 700,
    terraform: [{type: "height", value: 1.8}],
    emojis: ["💻", "👾", "🐜"],
    x: WORLD_WIDTH/2 - 1200/2,
    y: WORLD_HEIGHT/2 - 604/2,
    showInProjectList: false
  },
]

const randomizeProjectData = (projectData) => {
  let editedProjectData = projectData
  for (let projectIndex = 0; projectIndex < projectData.length; projectIndex++) {
      if(editedProjectData[projectIndex] !== undefined){
        if(editedProjectData[projectIndex].x === "randomize" || editedProjectData[projectIndex].y === "randomize"){
          let isColliding = true
          let maxTries = 30
          let tries = 0
          while(isColliding == true || tries <= maxTries){
            let randY = Math.random() * (WORLD_HEIGHT - editedProjectData[projectIndex].height)
            let randX = Math.random() * (WORLD_WIDTH - editedProjectData[projectIndex].width)
            editedProjectData[projectIndex].y = randY
            editedProjectData[projectIndex].x = randX
            isColliding = doesProjectIntersectWithAnyOtherProject(editedProjectData[projectIndex], editedProjectData)
            tries += 1
          }
      }
    }
  }
  return editedProjectData
}

const doesProjectIntersectWithAnyOtherProject = (boxA, projectData) => {
  let hasCollided = false;
  for (let index = 0; index < projectData.length; index++) {
    let boxB = projectData[index]
    if((boxB.x !== "randomize" || 
        boxB.y !== "randomize") &&
        boxB.body !== boxA.body
    ){
      if(((Math.abs(boxA.x - boxB.x) * 2 < (boxA.width + boxB.width)) && 
          (Math.abs(boxA.y - boxB.y) * 2 < (boxA.height + boxB.height)))
      ){
        hasCollided = true
      }              
    }
  }
  return hasCollided
}

const addWelcomeComponent = (projectData) => {
  for (let i = 0; i < projectData.length; i++) {
    if(projectData[i].title === "Welcome"){
      projectData[i].body = (
        <Welcome 
          projectData={projectData} 
          worldHeight={WORLD_HEIGHT} 
          worldWidth={WORLD_WIDTH}
        />
      )
    }
  }
  return projectData
}

export default addWelcomeComponent(randomizeProjectData(projectData))