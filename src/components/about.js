import Container from '../components/container'

export default function About() {
  const Input = ({title, input}) => {
    return <>
      <h3 className="px-5 md:px-0 py-10 text-2xl">
        {title}
      </h3>
      <div className="md:px-0 px-4">
        <span className="text-lg md:text-base opacity-60">
          {input}
        </span>
      </div>
    </>
  }

  return <Container>
    <div className="flex w-full h-full flex-col pb-10">
      <div className="items-center">
        <h1 className="md:ml-0 ml-5 text-3xl mt-16">
          about
        </h1>
        <div className="w-full md:w-2/3">
          <Input
            title="now"
            input={
              <>
                I have built, helped build, maintained and expanded a number of projects
                such as e-commerce websites, backend APIs and mobile apps to name a few.
                I have used a lot of different languages and frameworks;
                mostly React(Javascript/Typescript) for frontend and Nodejs/Go/Python/Scala
                for backend.
                <br /> <br />
                I would consider myself more of a backend dev but I have created
                multiple frontends using React for web and ReactNative/Ionic/Capacitor
                for mobile. I have experience setting up and maintaining production
                environments using CI/CD, Kubernetes with prometheus/grafana, cert-manager,
                ingress-nginx and so much more. I love to automate things and
                DevOps has always interested me.
                <br /> <br />
                A recent project I'm working on has me using multiple socket.io servers
                and I'm using redis Pub/Sub so the message is broadcasted to every server.
                I really enjoy building with scalability in mind.
              </>}
          />
          <Input
            title="blast from the past"
            input={
              <>
                I love to build things. I started off building with legos as a
                child and that evolved into building with code starting around 12.
                <br /> <br />
                As a teenager, I was running an online text based multiplayer game
                with an average of 15-30 daily users. It was coded in Visual
                Basics 6 and that is when I fell in love with the endless
                possibilities coding offers.
              </>}
          />
          <Input
            title="where ya been living?"
            input={
              <>
                I was born on an island called Providenciales, AKA Provo, in Turks & Caicos Islands.
                I moved to Quebec, Canada around the age of 9, learned French and at 17 I was
                living on my own in Montreal working and finishing my education.
                I lived there until my mid 20s before moving back to the islands
                where I had been living up until 2020 when I moved to Texas.
              </>}
          />
        </div>
      </div>
    </div>
  </Container>

}
