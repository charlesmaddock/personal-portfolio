import React, {useState} from "react"
// Custom
import StyledLink from "./StyledLink"
import ProjectList from "./ProjectList"

const textStyle = {margin: "8px 0 8px 0"}

const Welcome = ({projectData}) => {
  const [projectListVisible, setProjectListVisible] = useState(false)

  return(
    <>
      <ProjectList 
        projectData={projectData} 
        setVisible={setProjectListVisible}
        visible={projectListVisible}
      />
      <div style={{display: "flex", alignItems: "flex-start"}}>

        <div style={{width: 380, display: "inline-block"}}>
          <h2>
            Welcome to my portfolio!
          </h2>
          <p>
            Scroll around to explore and find
            projects and things I have done... There are {projectData.length} to find.
          </p>
          <p>
            {"Or just "}
            <span 
              style={{textDecoration: "underline", cursor: "pointer"}} 
              onClick={()=> setProjectListVisible(true)}
            >
                press this link
            </span> 
            {" to"} see a list, but that's pretty boring, <i>don't you agree?</i>
          </p>
          <p>
            Refresh the page to get a new world.
          </p>
        </div>
        <div style={{marginLeft: 20, width: 380, display: "inline-block"}}>
          <h2>
            About me:
          </h2>
          <p style={textStyle}>
            I'm very creative - I mean, my portfolio website has procedural world 
            generation, right? 
          </p>
          <p style={textStyle}>
            I've also done a lot of programming: <b style={{fontWeight: 600}}>AI, simulations, frontend, backend, games, 
            networking, app development </b> in a variety of languages. Also dabbled around with
            <b style={{fontWeight: 600}}> databases, DevOps and scrum.</b>
          </p>
          <p style={textStyle}>
            Needless to say, if you got me on your team, 
            <b style={{fontWeight: 600}}> we become a force to be reckoned with.</b>
          </p>

          <h3>
            Contact me
          </h3>
          <StyledLink title="CharlesAlexander.Maddock@gmail.com" href="mailto:CharlesAlexander.Maddock@gmail.com"/>
          <StyledLink title="My instagram" href="https://www.instagram.com/charles.maddock/"/>

        </div>
        <div style={{marginLeft: 20, width: 380, display: "inline-block"}}>
          <h2>
            Contribute
          </h2>
          <div>
            <p style={textStyle}>
              Want to take a look at the code? Find any bugs or typos? Want procedural
              world generation in your website too? It's your lucky day, all the code is open source 
              and free to use from my github!
            </p>
            <StyledLink title="See the Github Repository" href="https://github.com/charlesmaddock/personal-portfolio"/>
            <StyledLink title="Create a issue" href="https://github.com/charlesmaddock/personal-portfolio/issues"/>
            <StyledLink title="Add your own code to the project!" href="https://github.com/charlesmaddock/personal-portfolio/pulls"/>
          </div>
        </div>
      </div>
    </>
  )
}
  

export default Welcome