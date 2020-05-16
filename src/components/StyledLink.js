import React from "react"

const Link = ({title, href}) => (
  <div style={{marginTop: 10}}>
    <a 
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      style={{margin: "4px 0 4px 0", textDecoration: "none", color: "darkgreen"}}
    >
      {title}
    </a>
</div>
)

export default Link