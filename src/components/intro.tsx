import { Link } from "react-router-dom";

const Intro = () => {
  const IntroHeader = () => {
    return (
      <div className="md:flex flex-col text-4xl leading-relaxed">
        <span>
          Maker, builder <span className="text-redish">and</span>
        </span>
        <span>
          {" "}
          everything <span className="text-redish">in</span> between.
        </span>
      </div>
    );
  };

  const IntroText = () => {
    return (
      <div className="mt-20 w-full sm:w-3/5">
        <span className="w-full h-full items-center mb-10">
          I'm a Software Engineer from Turks & Caicos Islands; currently living in Austin, Texas.
          I love keeping my dog entertained, building/automating things, capturing moments through photography,
          exploring new places, taking on DIY projects, playing outdoor basketball, enjoying live music,
          seeking out new knowledge and embracing the beauty of nature.
          I'm charting my own path in life where I constantly focus on developing self-awareness, pushing for growth,
          designing for work-life harmony and prioritizing physical and mental well-being. Find out more about me{" "}
          <Link
            className="hover:text-redish cursor-pointer underline"
            to="/about"
          >
            here
          </Link>
          {"."}
        </span>
      </div>
    );
  };

  const IntroTextWithImage = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between">
        <IntroText />
        <div className="self-center items-center p-10 w-72 h-full">
          <img
            src="/adsf74725sdr234.png"
            alt="shadow (right) & mitch (left)"
            className="grayscale rounded w-full h-full"
            width="200"
            height="200"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="mt-20 px-4">
      <IntroHeader />
      <IntroTextWithImage />
    </div>
  );
};

export default Intro;
