import React from "react"
import Navbar from "./navbar"
import Footer from "./footer"

const Container = ({ children }) => {
  return <>
    <div
      style={{ backgroundColor: "#151a22", fontFamily: "Menlo" }}
      className="flex-1 text-white"
    >
      <div className="flex flex-col">
        <Navbar />
        <div className="flex-grow w-full md:max-w-6xl mx-auto">{children}</div>
        <Footer />
      </div>
    </div>
  </>
}

export default Container
