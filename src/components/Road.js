import React from "react"

const Road = () => {
  let length = (Math.random() * 100) + 100
  let width = 20
  let direction = Math.random() > 0.5 ? "up" : "left"
  return(
    <div
      style={{
        background: "lightgrey",
        borderRadius: 6,
        marginTop: 6,
        width: direction === "up" ? width : length,
        height: direction === "up" ? length : width,
      }}
    />
  )
}

export default Road