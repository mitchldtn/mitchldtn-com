import React from "react";


const TextLogo = ({ isScrolling }) => {
  return (
    <div>
      <div className="hover:text-redish cursor-pointer no-underline">
        <span
          style={{
            transition: "opacity 250ms ease-in-out,margin 250ms ease-in-out",
            opacity: isScrolling ? 1 : 0,
            marginRight: isScrolling ? ".6em" : "-.75em",
            textDecoration: 'none'
          }}>{"@"}</span>
        <span
          style={{
            transition: "margin 250ms ease-in-out",
            marginLeft: isScrolling ? "-.5em" : "-.5em",
          }}>m</span>
        <span
          style={{
            display: isScrolling ? "none" : null
          }}>itch l</span>
        <span
          style={{
            display: isScrolling ? null : "none"
          }}>itch</span>
        <span
          style={{
            transition: "opacity 250ms ease-in-out,margin 250ms ease-in-out",
            marginLeft: isScrolling ? "0em" : ".60em",
            opacity: isScrolling ? 1 : 0,
            textTransform: isScrolling ? "lowercase" : "uppercase",
          }}>l</span>
        <span
          style={{
            marginLeft: "-1.2em",
            display: isScrolling ? "none" : null
          }}>u</span>
        <span
          style={{
            transition: "margin 250ms ease-in-out",
            marginLeft: isScrolling ? "0em" : "0em",
          }}>d</span>
        <span
          style={{
            transition: "opacity 250ms ease-in-out,margin 250ms ease-in-out",
            opacity: isScrolling ? 0 : 1,
            marginRight: isScrolling ? "0em" : "-1.60em"
          }}>ing</span>
        <span
          style={{
            transition: "margin 250ms ease-in-out",
            marginLeft: isScrolling ? "-1.77em" : "1.6em"
          }}>t</span>
        <span
          style={{
            transition: "opacity 250ms ease-in-out,margin 250ms ease-in-out",
            opacity: isScrolling ? 0 : 1,
            marginRight: isScrolling ? ".9em" : "-1.60em"
          }}>o</span>
        <span
          style={{
            transition: "margin 250ms ease-in-out",
            marginLeft: isScrolling ? "-1.5em" : "1.6em"
          }}>n</span>
      </div>
    </div>
  )
}

export default TextLogo
