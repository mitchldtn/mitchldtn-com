const Intro = () => {
  const IntroHeader = () => {
    return (
      <div className="md:flex flex-col text-4xl leading-relaxed pb-8">
        <span>
          Engineer<span className="text-redish">.</span> Maker<span className="text-redish">.</span> Builder<span className="text-redish">.</span>
        </span>
      </div>
    );
  };

  const IntroText = () => {
    return (
      <div className="mt-10 w-full sm:w-3/5">
        <span className="w-full h-full items-center mb-10 text-xl">
          Originally from Turks & Caicos islands, now based in Austin, Texas.
          I build scalable distributed systems, hardware prototypes and everything in between.
        </span>
      </div>
    );
  };

  const IntroTextWithImage = () => {
    return (
      <div className="flex flex-col md:flex-row justify-between">
        <IntroText />
        <div className="self-center items-center p-4 md:p-10 h-full w-full max-w-[600px]">
          <img
            src="/mitch-and-boots.jpg"
            alt="mitch (right) & boots (left)"
            className="rounded w-full h-full"
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
