import React from 'react'
import Navbar from "./navbar"
import Footer from "./footer"

interface ContainerProps {
  children: React.ReactNode
}

const Container: React.FC<ContainerProps> = props => {
  return <>
    <div
      style={{ backgroundColor: "#151a22", fontFamily: "Menlo" }}
      className="flex-1 text-white"
    >
      <div className="flex flex-col">
        <Navbar />
        <div className="flex-grow w-full md:max-w-6xl mx-auto">{props.children}</div>
        <Footer />
      </div>
    </div>
  </>
}

export default Container
