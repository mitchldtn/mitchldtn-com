import { Link } from "react-router-dom"

const Intro = () => {
  const IntroHeader = () => {
    return <div className="text-4xl leading-relaxed">Maker, builder <span className="text-redish" >and</span>
      <br /> everything <span className="text-redish" >in</span> between.
    </div>
  }

  const IntroText = () => {
    return <div className="mt-20 w-full md:w-3/5">
      <span className="w-full h-full items-center mb-10">
        I'm a Software Engineer from Turks & Caicos Islands and I'm currently
        living in Texas. I write a lot of code for work and fun with a primary focus on pure functional programming.
        I love automation. I also love my dog, building stuff,
        a nice whisky, learning new things and exploring the great outdoors,
        just to name a few. I'm striving to make my own path in life with a
        big focus on awareness, growth, work/life balance, physical and mental health.
        Find out more about me{" "}
          <Link className="hover:text-redish cursor-pointer underline"
            to="/about">
            here
          </Link>
        {"."}
      </span>
    </div>
  }

  const IntroTextWithImage = () => {
    return <div className="flex flex-col md:flex-row justify-between">
      <IntroText />
      <div className="self-center items-center p-10 w-72 h-full">
        <img
          src="/adsf74725sdr234.png"
          alt="Shadow (Right) & Mitch (Left)"
          className="grayscale rounded w-full h-full"
          width="200"
          height="200"/>
      </div>
    </div>
  }

  return (
    <div className="mt-20 px-4 md:px-0">
      <IntroHeader />
      <IntroTextWithImage />
    </div>
  )
}

export default Intro
