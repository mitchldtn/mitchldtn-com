import React from 'react'
import { IconType } from 'react-icons'
import { FaLinkedin, FaGithub, FaGoodreads, FaInstagram, FaStackOverflow } from "react-icons/fa"

const Footer = () => {

  interface OutsideLinkProps {
    link: string,
    linkTitle: string,
    LinkLogo: IconType
  }
  const OutsideLink: React.FC<OutsideLinkProps> = props => {
    return <div className="py-5 px-5 md:py-0">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.link}
        className="flex hover:text-redish cursor-pointer"
      >
        {props.linkTitle}
        <div className="mt-1 pl-2">
          <props.LinkLogo />
        </div>
      </a>
    </div>
  }

  return <footer
    style={{ boxShadow: "rgb(255 255 255 / 15%) 0px 1px 4px 0px" }}
    className="box-border flex-1 h-28 bg-black w-full"
  >
    <div className="items-center text-center w-full max-w-6xl mx-auto px-2.5 py-10">
      <div
        className={`flex flex-col md:flex-row self-center
          md:justify-between w-full items-center
          md:items-baseline`
        }
      >
        <div>
          <span>© {new Date().getFullYear()} mitch ludington</span>
        </div>
        <div className="flex mt-5 items-center md:mt-0 flex-col md:flex-row">
          <OutsideLink
            link="https://linkedin.com/in/mitchldtn/"
            linkTitle="linkedin"
            LinkLogo={FaLinkedin} />
          <OutsideLink
            link="https://github.com/mitchldtn"
            linkTitle="github"
            LinkLogo={FaGithub} />
          <OutsideLink
            link="https://stackoverflow.com/users/3088464/mitchldtn"
            linkTitle="stackoverflow"
            LinkLogo={FaStackOverflow} />
          <OutsideLink
            link="https://goodreads.com/mitchldtn"
            linkTitle="goodreads"
            LinkLogo={FaGoodreads} />
          <OutsideLink
            link="https://instagram.com/mitchldtn/"
            linkTitle="instagram"
            LinkLogo={FaInstagram} />
        </div>
      </div>
    </div>
  </footer>
}

export default Footer
