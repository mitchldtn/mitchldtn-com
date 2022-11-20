import { useState, useEffect } from "react"
import { FaBars } from "react-icons/fa"
import TextLogo from "./logo"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [active, setActive] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const linkCls = `flex w-full text-white items-center
    hover:text-redish cursor-pointer pt-2.5
    md:text-base md:py-0 text-xl py-10 mt-10 md:mt-0`

  const onAbout = window.location.pathname === "/about"

  const onClick = () => {
    setActive(!active)
  }

  const changeNavbar = () => {
    if (window.scrollY >= 20) {
      setIsScrolling(true)
    } else {
      setIsScrolling(false)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar, { passive: true })
  }, [])

  return (
    <header
      style={{
        zIndex: 100,
        boxShadow: isScrolling ? "rgb(255 255 255 / 15%) 0px 1px 4px 0px" : "",
        transition: `background 250ms ease-in-out 0s, box-shadow 250ms ease-in-out 0s`,
        backgroundColor: isScrolling ? "black" : "transparent",
      }}
      className={`text-white sticky top-0 w-full mt-5 px-5`}
    >
      <div className="md:max-w-6xl mx-auto w-full flex items-center justify-between p-3.5">
        <Link to="/" className="w-40 ">
          <TextLogo isScrolling={isScrolling} />
        </Link>
        <div
          onClick={onClick}
          className={"md:hidden"}
        >
          <FaBars />
        </div>
        <nav
          className={`${!active && "hidden"}
              absolute flex flex-col top-full w-96 bg-black bg-opacity-90 md:bg-opacity-0
              md:static md:w-auto md:flex md:bg-transparent items-center right-0 text-center`}
        >
          <ul className="md:flex-row flex flex-col">
            <li className="md:mr-5">
              <Link
                to="/about"
                className={`${linkCls} ${onAbout && "text-greyish underline"}`}
              >about</Link>
            </li>
            <li className="md:mr-5">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/mitchldtn/"
                className={linkCls}
              >contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
